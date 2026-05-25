package com.accessexam.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.accessexam.dto.ResultDto;
import com.accessexam.dto.SubmissionRequest;
import com.accessexam.entity.Answer;
import com.accessexam.entity.Exam;
import com.accessexam.entity.ExamAttempt;
import com.accessexam.entity.Question;
import com.accessexam.entity.User;
import com.accessexam.repository.ExamAttemptRepository;
import com.accessexam.repository.ExamRepository;
import com.accessexam.repository.QuestionRepository;
import com.accessexam.repository.UserRepository;

import jakarta.transaction.Transactional;

/**
 * Submission service — handles exam start, answer submission, and result calculation.
 * All grading is done server-side using the correctOption from the DB.
 */
@Service
public class SubmissionService {

    private static final Logger log = LoggerFactory.getLogger(SubmissionService.class);

    private final ExamAttemptRepository attemptRepository;
    private final ExamRepository examRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public SubmissionService(ExamAttemptRepository attemptRepository,
                             ExamRepository examRepository,
                             UserRepository userRepository,
                             QuestionRepository questionRepository){
        this.attemptRepository = attemptRepository;
        this.examRepository = examRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }

    /**
     * Start an exam attempt.
     * Returns the attempt ID which the frontend uses when submitting.
     */
    @Transactional
    public Map<String, Object> startExam(Long examId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found: " + examId));

        // Check for existing in-progress attempt
        Optional<ExamAttempt> existing = attemptRepository
                .findByUserIdAndExamIdAndStatus(user.getId(), examId, ExamAttempt.AttemptStatus.IN_PROGRESS);

        if (existing.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("attemptId", existing.get().getId());
            response.put("message", "Resuming existing attempt");
            response.put("startedAt", existing.get().getStartedAt());
            // Include extra time for this user
            int totalMinutes = exam.getDurationMinutes() + user.getExtraTimeMinutes();
            response.put("durationMinutes", totalMinutes);
            return response;
        }

        ExamAttempt attempt = ExamAttempt.builder()
                .user(user)
                .exam(exam)
                .startedAt(LocalDateTime.now())
                .status(ExamAttempt.AttemptStatus.IN_PROGRESS)
                .build();

        attempt = attemptRepository.save(attempt);

        int totalMinutes = exam.getDurationMinutes() + user.getExtraTimeMinutes();

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getId());
        response.put("message", "Exam started successfully");
        response.put("startedAt", attempt.getStartedAt());
        response.put("durationMinutes", totalMinutes);
        response.put("extraTimeGranted", user.getExtraTimeMinutes());
        return response;
    }

    /**
     * Submit exam answers and compute result.
     * Grading is 100% server-side — no correct answers were ever sent to the client.
     */
    @Transactional
    public ResultDto submitExam(SubmissionRequest request, String userEmail) {
        ExamAttempt attempt = attemptRepository.findById(request.getAttemptId())
                .orElseThrow(() -> new RuntimeException("Attempt not found: " + request.getAttemptId()));

        // Security: ensure the attempt belongs to the requesting user
        if (!attempt.getUser().getEmail().equals(userEmail)) {
            throw new SecurityException("Unauthorized: attempt does not belong to this user");
        }

        if (attempt.getStatus() != ExamAttempt.AttemptStatus.IN_PROGRESS) {
            throw new IllegalStateException("This exam has already been submitted.");
        }

        Exam exam = attempt.getExam();
        List<Question> questions = questionRepository.findByExamIdOrderByOrderIndexAsc(exam.getId());

        // Build answer map for quick lookup: questionId -> selectedOption
        Map<Long, Integer> answerMap = new HashMap<>();
        if (request.getAnswers() != null) {
            for (SubmissionRequest.AnswerItem item : request.getAnswers()) {
                answerMap.put(item.getQuestionId(), item.getSelectedOption());
            }
        }

        // Grade answers
        int score = 0;
        List<ResultDto.QuestionResult> breakdown = new ArrayList<>();

        for (Question q : questions) {
            int selected = answerMap.getOrDefault(q.getId(), -1);
            boolean isCorrect = (selected == q.getCorrectOption());
            if (isCorrect) score++;

            Answer answer = Answer.builder()
                    .attempt(attempt)
                    .question(q)
                    .selectedOption(selected)
                    .build();
            attempt.getAnswers().add(answer);

            breakdown.add(ResultDto.QuestionResult.builder()
                    .questionId(q.getId())
                    .questionText(q.getQuestionText())
                    .selectedOption(selected)
                    .correctOption(q.getCorrectOption())
                    .isCorrect(isCorrect)
                    .options(List.of(q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()))
                    .build());
        }

        // Update attempt
        attempt.setScore(score);
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setStatus(ExamAttempt.AttemptStatus.SUBMITTED);
        attemptRepository.save(attempt);

        // Calculate result metrics
        int total = questions.size();
        int totalMarks = score * exam.getMarksPerQuestion();
        int maxMarks = total * exam.getMarksPerQuestion();
        double percentage = total > 0 ? (double) score / total * 100 : 0;
        boolean passed = percentage >= 40.0;

        // Calculate time taken
        Duration duration = Duration.between(attempt.getStartedAt(), attempt.getSubmittedAt());
        String timeTaken = String.format("%02d:%02d:%02d",
                duration.toHours(), duration.toMinutesPart(), duration.toSecondsPart());

        // Grade
        String grade;
        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 40) grade = "D";
        else grade = "F";

        return ResultDto.builder()
                .attemptId(attempt.getId())
                .examId(exam.getId())
                .examTitle(exam.getTitle())
                .score(score)
                .total(total)
                .totalMarks(totalMarks)
                .maxMarks(maxMarks)
                .percentage(Math.round(percentage * 10.0) / 10.0)
                .passed(passed)
                .timeTaken(timeTaken)
                .grade(grade)
                .breakdown(breakdown)
                .build();
    }

    /** Get all submissions for the current student */
    public List<Map<String, Object>> getMySubmissions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return attemptRepository.findByUserIdOrderByStartedAtDesc(user.getId())
                .stream()
                .map(a -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("attemptId", a.getId());
                    m.put("examId", a.getExam().getId());
                    m.put("examTitle", a.getExam().getTitle());
                    m.put("score", a.getScore());
                    m.put("total", questionRepository.countByExamId(a.getExam().getId()));
                    m.put("status", a.getStatus());
                    m.put("startedAt", a.getStartedAt());
                    m.put("submittedAt", a.getSubmittedAt());
                    int total = questionRepository.countByExamId(a.getExam().getId());
                    double pct = total > 0 ? (double) a.getScore() / total * 100 : 0;
                    m.put("percentage", Math.round(pct * 10.0) / 10.0);
                    return m;
                })
                .collect(Collectors.toList());
    }

    /** Get all submissions for an exam (Admin only) */
    public List<Map<String, Object>> getExamSubmissions(Long examId) {
        return attemptRepository.findByExamIdOrderBySubmittedAtDesc(examId)
                .stream()
                .map(a -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("attemptId", a.getId());
                    m.put("studentId", a.getUser().getId());
                    m.put("studentName", a.getUser().getName());
                    m.put("studentEmail", a.getUser().getEmail());
                    m.put("disabilityType", a.getUser().getDisabilityType());
                    m.put("score", a.getScore());
                    m.put("status", a.getStatus());
                    m.put("submittedAt", a.getSubmittedAt());
                    return m;
                })
                .collect(Collectors.toList());
    }
}
