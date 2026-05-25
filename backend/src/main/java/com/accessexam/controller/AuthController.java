package com.accessexam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accessexam.dto.LoginRequest;
import com.accessexam.dto.LoginResponse;
import com.accessexam.dto.RegisterRequest;
import com.accessexam.service.AuthService;

import jakarta.validation.Valid;

/**
 * Auth REST Controller
 * POST /api/auth/register — register a new user
 * POST /api/auth/login    — login and receive JWT
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){ this.authService = authService; }

    /** Register a new student or admin */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /** Login with email + password → returns JWT token */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
