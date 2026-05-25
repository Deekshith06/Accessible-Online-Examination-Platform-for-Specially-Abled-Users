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
 * ExamAttempt entity — tracks one student's attempt at one exam.
 * Created when student calls /api/submissions/start/{examId}.
 * Updated when student submits answers.
 */
@Entity
@Table(name = "exam_attempts")
public class ExamAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "started_at")
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    /** Raw number of correct answers */
    private int score = 0;

    @Enumerated(EnumType.STRING)
    private AttemptStatus status = AttemptStatus.IN_PROGRESS;

    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>();

    public enum AttemptStatus {
        IN_PROGRESS, SUBMITTED, TIMED_OUT
    }

    public ExamAttempt(){
        this.startedAt = LocalDateTime.now();
        this.score = 0;
        this.status = AttemptStatus.IN_PROGRESS;
        this.answers = new ArrayList<>();
    }

    // Getters and setters used by services
    public Long getId(){ return id; }
    public User getUser(){ return user; }
    public Exam getExam(){ return exam; }
    public LocalDateTime getStartedAt(){ return startedAt; }
    public LocalDateTime getSubmittedAt(){ return submittedAt; }
    public int getScore(){ return score; }
    public AttemptStatus getStatus(){ return status; }
    public List<Answer> getAnswers(){ return answers; }

    public void setId(Long id){ this.id = id; }
    public void setUser(User u){ this.user = u; }
    public void setExam(Exam e){ this.exam = e; }
    public void setStartedAt(LocalDateTime t){ this.startedAt = t; }
    public void setSubmittedAt(LocalDateTime t){ this.submittedAt = t; }
    public void setScore(int s){ this.score = s; }
    public void setStatus(AttemptStatus s){ this.status = s; }
    public void setAnswers(List<Answer> a){ this.answers = a; }

    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private ExamAttempt a = new ExamAttempt();
        public Builder id(Long id){ a.setId(id); return this; }
        public Builder user(User u){ a.setUser(u); return this; }
        public Builder exam(Exam e){ a.setExam(e); return this; }
        public Builder startedAt(LocalDateTime t){ a.setStartedAt(t); return this; }
        public Builder status(AttemptStatus s){ a.setStatus(s); return this; }
        public ExamAttempt build(){ return a; }
    }
}
