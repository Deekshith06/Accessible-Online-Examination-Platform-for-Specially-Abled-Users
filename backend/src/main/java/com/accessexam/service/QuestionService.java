package com.accessexam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.accessexam.dto.QuestionDto;
import com.accessexam.dto.QuestionRequest;
import com.accessexam.entity.Exam;
import com.accessexam.entity.Question;
import com.accessexam.repository.ExamRepository;
import com.accessexam.repository.QuestionRepository;

import jakarta.transaction.Transactional;

/**
 * Question service — CRUD operations for exam questions (Admin).
 */
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;

    public QuestionService(QuestionRepository questionRepository, ExamRepository examRepository){
        this.questionRepository = questionRepository;
        this.examRepository = examRepository;
    }

    /** Get all questions for an exam (without correct answers — for students) */
    public List<QuestionDto> getQuestionsForExam(Long examId) {
        return questionRepository.findByExamIdOrderByOrderIndexAsc(examId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /** Get all questions WITH correct answers (Admin use only) */
    public List<QuestionRequest> getQuestionsWithAnswers(Long examId) {
        return questionRepository.findByExamIdOrderByOrderIndexAsc(examId)
                .stream()
                .map(q -> {
                    QuestionRequest r = new QuestionRequest();
                    r.setExamId(examId);
                    r.setQuestionText(q.getQuestionText());
                    r.setOptionA(q.getOptionA());
                    r.setOptionB(q.getOptionB());
                    r.setOptionC(q.getOptionC());
                    r.setOptionD(q.getOptionD());
                    r.setCorrectOption(q.getCorrectOption());
                    r.setOrderIndex(q.getOrderIndex());
                    return r;
                })
                .collect(Collectors.toList());
    }

    /** Add a question to an exam (Admin) */
    @Transactional
    public QuestionDto addQuestion(QuestionRequest request) {
        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found: " + request.getExamId()));

        Question q = Question.builder()
                .exam(exam)
                .questionText(request.getQuestionText())
                .optionA(request.getOptionA())
                .optionB(request.getOptionB())
                .optionC(request.getOptionC())
                .optionD(request.getOptionD())
                .correctOption(request.getCorrectOption())
                .orderIndex(request.getOrderIndex())
                .build();

        return toDto(questionRepository.save(q));
    }

    /** Update a question (Admin) */
    @Transactional
    public QuestionDto updateQuestion(Long id, QuestionRequest request) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found: " + id));

        q.setQuestionText(request.getQuestionText());
        q.setOptionA(request.getOptionA());
        q.setOptionB(request.getOptionB());
        q.setOptionC(request.getOptionC());
        q.setOptionD(request.getOptionD());
        q.setCorrectOption(request.getCorrectOption());
        q.setOrderIndex(request.getOrderIndex());

        return toDto(questionRepository.save(q));
    }

    /** Delete a question (Admin) */
    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found: " + id);
        }
        questionRepository.deleteById(id);
    }

    private QuestionDto toDto(Question q) {
        return QuestionDto.builder()
                .id(q.getId())
                .questionText(q.getQuestionText())
                .options(List.of(q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()))
                .orderIndex(q.getOrderIndex())
                .build();
    }
}
