package com.accessexam.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Exam entity — represents a scheduled examination with questions.
 */
@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes = 60;

    @Column(name = "marks_per_question")
    private int marksPerQuestion = 4;

    @Enumerated(EnumType.STRING)
    private ExamStatus status = ExamStatus.UPCOMING;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Question> questions = new ArrayList<>();

    public enum ExamStatus {
        UPCOMING, ACTIVE, CLOSED
    }

    public Exam() {
        this.durationMinutes = 60;
        this.marksPerQuestion = 4;
        this.status = ExamStatus.UPCOMING;
        this.questions = new ArrayList<>();
    }

    // Getters and setters
    public Long getId(){ return id; }
    public String getTitle(){ return title; }
    public String getDescription(){ return description; }
    public int getDurationMinutes(){ return durationMinutes; }
    public int getMarksPerQuestion(){ return marksPerQuestion; }
    public ExamStatus getStatus(){ return status; }
    public LocalDateTime getScheduledAt(){ return scheduledAt; }
    public User getCreatedBy(){ return createdBy; }
    public List<Question> getQuestions(){ return questions; }

    public void setId(Long id){ this.id = id; }
    public void setTitle(String title){ this.title = title; }
    public void setDescription(String description){ this.description = description; }
    public void setDurationMinutes(int d){ this.durationMinutes = d; }
    public void setMarksPerQuestion(int m){ this.marksPerQuestion = m; }
    public void setStatus(ExamStatus s){ this.status = s; }
    public void setScheduledAt(LocalDateTime t){ this.scheduledAt = t; }
    public void setCreatedBy(User u){ this.createdBy = u; }
    public void setQuestions(List<Question> q){ this.questions = q; }

    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private Exam e = new Exam();
        public Builder id(Long id){ e.setId(id); return this; }
        public Builder title(String t){ e.setTitle(t); return this; }
        public Builder description(String d){ e.setDescription(d); return this; }
        public Builder durationMinutes(int dm){ e.setDurationMinutes(dm); return this; }
        public Builder marksPerQuestion(int mpq){ e.setMarksPerQuestion(mpq); return this; }
        public Builder status(ExamStatus s){ e.setStatus(s); return this; }
        public Builder scheduledAt(LocalDateTime t){ e.setScheduledAt(t); return this; }
        public Builder createdBy(User u){ e.setCreatedBy(u); return this; }
        public Exam build(){ return e; }
    }
}
