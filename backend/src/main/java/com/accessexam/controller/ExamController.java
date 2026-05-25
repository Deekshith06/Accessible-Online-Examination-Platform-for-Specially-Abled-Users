package com.accessexam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accessexam.dto.ExamDto;
import com.accessexam.dto.ExamRequest;
import com.accessexam.service.ExamService;

import jakarta.validation.Valid;

/**
 * Exam REST Controller
 * GET    /api/exams          — list all exams (Students + Admins)
 * GET    /api/exams/{id}     — get exam with questions (Students + Admins)
 * POST   /api/exams          — create exam (Admin only)
 * PUT    /api/exams/{id}     — update exam (Admin only)
 * DELETE /api/exams/{id}     — delete exam (Admin only)
 */
@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService){ this.examService = examService; }

    /** List all available exams */
    @GetMapping
    public ResponseEntity<List<ExamDto>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    /** Get a specific exam (with its questions, without correct answers) */
    @GetMapping("/{id}")
    public ResponseEntity<ExamDto> getExam(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    /** Create a new exam — Admin only */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExamDto> createExam(
            @Valid @RequestBody ExamRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(examService.createExam(request, principal.getUsername()));
    }

    /** Update an exam — Admin only */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExamDto> updateExam(
            @PathVariable Long id,
            @Valid @RequestBody ExamRequest request) {
        return ResponseEntity.ok(examService.updateExam(id, request));
    }

    /** Delete an exam — Admin only */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
