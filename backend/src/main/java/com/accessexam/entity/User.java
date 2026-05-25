package com.accessexam.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * User entity — represents both Students and Admins.
 * disability_type drives which accessibility features are pre-enabled.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "disability_type")
    private DisabilityType disabilityType = DisabilityType.NONE;

    /** Extra time in minutes granted by admin (e.g. +30 for visual impairment) */
    @Column(name = "extra_time_minutes")
    private int extraTimeMinutes = 0;

    /**
     * JSON blob of accessibility preferences:
     * { ttsEnabled, highContrast, largeText, dyslexiaFont, voiceCommands, ... }
     */
    @Column(name = "accessibility_prefs", columnDefinition = "TEXT")
    private String accessibilityPrefs;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Enums ───────────────────────────────────────────────

    public enum Role {
        STUDENT, ADMIN
    }

    public enum DisabilityType {
        VISUAL, HEARING, MOTOR, COGNITIVE, NONE
    }

    // Constructors
    public User() {
        this.extraTimeMinutes = 0;
        this.disabilityType = DisabilityType.NONE;
        this.createdAt = LocalDateTime.now();
    }

    public User(Long id, String name, String email, String password, Role role, DisabilityType disabilityType,
                int extraTimeMinutes, String accessibilityPrefs, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.disabilityType = disabilityType;
        this.extraTimeMinutes = extraTimeMinutes;
        this.accessibilityPrefs = accessibilityPrefs;
        this.createdAt = createdAt;
    }

    // Getters and setters used by services
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Role getRole() { return role; }
    public DisabilityType getDisabilityType() { return disabilityType; }
    public int getExtraTimeMinutes() { return extraTimeMinutes; }
    public String getAccessibilityPrefs() { return accessibilityPrefs; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(Role role) { this.role = role; }
    public void setDisabilityType(DisabilityType disabilityType) { this.disabilityType = disabilityType; }
    public void setExtraTimeMinutes(int extraTimeMinutes) { this.extraTimeMinutes = extraTimeMinutes; }
    public void setAccessibilityPrefs(String accessibilityPrefs) { this.accessibilityPrefs = accessibilityPrefs; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Simple builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private User u = new User();
        public Builder id(Long id){ u.setId(id); return this; }
        public Builder name(String name){ u.setName(name); return this; }
        public Builder email(String email){ u.setEmail(email); return this; }
        public Builder password(String p){ u.setPassword(p); return this; }
        public Builder role(Role r){ u.setRole(r); return this; }
        public Builder disabilityType(DisabilityType d){ u.setDisabilityType(d); return this; }
        public Builder extraTimeMinutes(int m){ u.setExtraTimeMinutes(m); return this; }
        public Builder accessibilityPrefs(String p){ u.setAccessibilityPrefs(p); return this; }
        public User build(){ return u; }
    }
}
