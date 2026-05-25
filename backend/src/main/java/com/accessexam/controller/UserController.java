package com.accessexam.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accessexam.dto.UserDto;
import com.accessexam.service.UserService;

/**
 * User REST Controller
 * GET /api/users/me                   — get my profile (Student/Admin)
 * PUT /api/users/me/accessibility     — save accessibility preferences (Student)
 * GET /api/users                      — list all students (Admin)
 * PUT /api/users/{id}/extra-time      — grant extra time (Admin)
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){ this.userService = userService; }

    /** Get the current authenticated user's profile */
    @GetMapping("/me")
    public ResponseEntity<UserDto> getMyProfile(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(userService.getMyProfile(principal.getUsername()));
    }

    /**
     * Save accessibility preferences.
     * Body: {"prefsJson": "{\"ttsEnabled\":true,\"highContrast\":false,...}"}
     */
    @PutMapping("/me/accessibility")
    public ResponseEntity<UserDto> saveAccessibilityPrefs(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody Map<String, String> body) {
        String prefsJson = body.getOrDefault("prefsJson", "{}");
        return ResponseEntity.ok(userService.saveAccessibilityPrefs(principal.getUsername(), prefsJson));
    }

    /** List all student users — Admin only */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }

    /**
     * Grant extra time to a student — Admin only.
     * Body: {"extraMinutes": 30}
     */
    @PutMapping("/{id}/extra-time")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> grantExtraTime(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        int minutes = body.getOrDefault("extraMinutes", 0);
        return ResponseEntity.ok(userService.grantExtraTime(id, minutes));
    }
}
