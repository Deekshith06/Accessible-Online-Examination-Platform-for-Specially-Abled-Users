package com.accessexam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.accessexam.dto.ExamDto;
import com.accessexam.dto.ExamRequest;
import com.accessexam.dto.QuestionDto;
import com.accessexam.entity.Exam;
import com.accessexam.entity.Question;
import com.accessexam.entity.User;
import com.accessexam.repository.ExamRepository;
import com.accessexam.repository.QuestionRepository;
import com.accessexam.repository.UserRepository;

import jakarta.transaction.Transactional;

/**
 * Exam service — CRUD operations for exams.
 */
@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public ExamService(ExamRepository examRepository, QuestionRepository questionRepository, UserRepository userRepository){
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    /** Get all exams (students see all; admins see all) */
    public List<ExamDto> getAllExams() {
        return examRepository.findAllByOrderByScheduledAtDesc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /** Get a single exam with its questions (questions WITHOUT correct answers) */
    public ExamDto getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found: " + id));

        List<Question> questions = questionRepository.findByExamIdOrderByOrderIndexAsc(id);

        ExamDto dto = toDto(exam);
        dto.setQuestions(questions.stream().map(this::toQuestionDto).collect(Collectors.toList()));
        return dto;
    }

    /** Create a new exam (Admin) */
    @Transactional
    public ExamDto createExam(ExamRequest request, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Exam exam = Exam.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .durationMinutes(request.getDurationMinutes())
                .marksPerQuestion(request.getMarksPerQuestion())
                .status(request.getStatus())
                .scheduledAt(request.getScheduledAt())
                .createdBy(admin)
                .build();

        return toDto(examRepository.save(exam));
    }

    /** Update an exam (Admin) */
    @Transactional
    public ExamDto updateExam(Long id, ExamRequest request) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found: " + id));

        exam.setTitle(request.getTitle());
        exam.setDescription(request.getDescription());
        exam.setDurationMinutes(request.getDurationMinutes());
        exam.setMarksPerQuestion(request.getMarksPerQuestion());
        exam.setStatus(request.getStatus());
        exam.setScheduledAt(request.getScheduledAt());

        return toDto(examRepository.save(exam));
    }

    /** Delete an exam and all its questions (Admin) */
    @Transactional
    public void deleteExam(Long id) {
        if (!examRepository.existsById(id)) {
            throw new RuntimeException("Exam not found: " + id);
        }
        examRepository.deleteById(id);
    }

    // ── Mappers ─────────────────────────────────────────────

    private ExamDto toDto(Exam exam) {
        int qCount = questionRepository.countByExamId(exam.getId());
        return ExamDto.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .description(exam.getDescription())
                .durationMinutes(exam.getDurationMinutes())
                .marksPerQuestion(exam.getMarksPerQuestion())
                .status(exam.getStatus())
                .scheduledAt(exam.getScheduledAt())
                .totalQuestions(qCount)
                .build();
    }

    private QuestionDto toQuestionDto(Question q) {
        return QuestionDto.builder()
                .id(q.getId())
                .questionText(q.getQuestionText())
                .options(List.of(q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()))
                .orderIndex(q.getOrderIndex())
                .build();
        // NOTE: correctOption is intentionally excluded
    }
}
