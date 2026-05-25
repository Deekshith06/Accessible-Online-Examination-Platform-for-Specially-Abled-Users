package com.accessexam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.accessexam.dto.UserDto;
import com.accessexam.entity.User;
import com.accessexam.repository.UserRepository;

import jakarta.transaction.Transactional;

/**
 * User service — profile management and accessibility preferences.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){ this.userRepository = userRepository; }

    /** Get current user's profile */
    public UserDto getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return toDto(user);
    }

    /** Save accessibility preferences (JSON string) for the current user */
    @Transactional
    public UserDto saveAccessibilityPrefs(String email, String prefsJson) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        user.setAccessibilityPrefs(prefsJson);
        return toDto(userRepository.save(user));
    }

    /** Get all students (Admin only) */
    public List<UserDto> getAllStudents() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.STUDENT)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /** Grant extra time to a student (Admin only) */
    @Transactional
    public UserDto grantExtraTime(Long userId, int extraMinutes) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        user.setExtraTimeMinutes(extraMinutes);
        return toDto(userRepository.save(user));
    }

    private UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .disabilityType(user.getDisabilityType())
                .extraTimeMinutes(user.getExtraTimeMinutes())
                .accessibilityPrefs(user.getAccessibilityPrefs())
                .build();
    }
}
