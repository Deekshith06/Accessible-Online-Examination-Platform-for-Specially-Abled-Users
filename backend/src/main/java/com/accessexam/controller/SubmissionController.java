package com.accessexam.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accessexam.dto.ResultDto;
import com.accessexam.dto.SubmissionRequest;
import com.accessexam.service.SubmissionService;

/**
 * Submission REST Controller
 * POST /api/submissions/start/{examId} — start exam attempt (Student)
 * POST /api/submissions/submit          — submit answers, get result (Student)
 * GET  /api/submissions/my              — my submission history (Student)
 * GET  /api/submissions/exam/{examId}   — all submissions for exam (Admin)
 */
@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService){ this.submissionService = submissionService; }

    /** Start a new exam attempt (or resume existing) */
    @PostMapping("/start/{examId}")
    public ResponseEntity<Map<String, Object>> startExam(
            @PathVariable Long examId,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(submissionService.startExam(examId, principal.getUsername()));
    }

    /** Submit answers and receive the full graded result */
    @PostMapping("/submit")
    public ResponseEntity<ResultDto> submitExam(
            @RequestBody SubmissionRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(submissionService.submitExam(request, principal.getUsername()));
    }

    /** Get current student's submission history */
    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getMySubmissions(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(submissionService.getMySubmissions(principal.getUsername()));
    }

    /** Get all submissions for a specific exam — Admin only */
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getExamSubmissions(@PathVariable Long examId) {
        return ResponseEntity.ok(submissionService.getExamSubmissions(examId));
    }
}
