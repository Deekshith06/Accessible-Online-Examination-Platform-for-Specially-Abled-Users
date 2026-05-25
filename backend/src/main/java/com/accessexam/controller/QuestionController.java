package com.accessexam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accessexam.dto.QuestionDto;
import com.accessexam.dto.QuestionRequest;
import com.accessexam.service.QuestionService;

import jakarta.validation.Valid;

/**
 * Question REST Controller
 * GET    /api/questions/exam/{examId}  — get questions for exam (Students, no answers)
 * POST   /api/questions                — add question to exam (Admin only)
 * PUT    /api/questions/{id}           — update question (Admin only)
 * DELETE /api/questions/{id}           — delete question (Admin only)
 */
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService){ this.questionService = questionService; }

    /** Get all questions for a specific exam (without correct answers) */
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<QuestionDto>> getQuestionsForExam(@PathVariable Long examId) {
        return ResponseEntity.ok(questionService.getQuestionsForExam(examId));
    }

    /** Add a question to an exam — Admin only */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuestionDto> addQuestion(@Valid @RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.addQuestion(request));
    }

    /** Update a question — Admin only */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuestionDto> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    /** Delete a question — Admin only */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
