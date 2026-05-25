package com.accessexam.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.accessexam.entity.Exam;

/** Exam data transfer object — used for both list views and full exam with questions */
public class ExamDto {
    private Long id;
    private String title;
    private String description;
    private int durationMinutes;
    private int marksPerQuestion;
    private Exam.ExamStatus status;
    private LocalDateTime scheduledAt;
    private int totalQuestions;

    /** Only populated when fetching a single exam's full details */
    private List<QuestionDto> questions;

    public ExamDto() {}

    public Long getId(){ return id; }
    public String getTitle(){ return title; }
    public String getDescription(){ return description; }
    public int getDurationMinutes(){ return durationMinutes; }
    public int getMarksPerQuestion(){ return marksPerQuestion; }
    public Exam.ExamStatus getStatus(){ return status; }
    public LocalDateTime getScheduledAt(){ return scheduledAt; }
    public int getTotalQuestions(){ return totalQuestions; }
    public List<QuestionDto> getQuestions(){ return questions; }

    public void setId(Long v){ this.id = v; }
    public void setTitle(String v){ this.title = v; }
    public void setDescription(String v){ this.description = v; }
    public void setDurationMinutes(int v){ this.durationMinutes = v; }
    public void setMarksPerQuestion(int v){ this.marksPerQuestion = v; }
    public void setStatus(Exam.ExamStatus v){ this.status = v; }
    public void setScheduledAt(LocalDateTime v){ this.scheduledAt = v; }
    public void setTotalQuestions(int v){ this.totalQuestions = v; }
    public void setQuestions(List<QuestionDto> v){ this.questions = v; }

    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private ExamDto e = new ExamDto();
        public Builder id(Long v){ e.setId(v); return this; }
        public Builder title(String v){ e.setTitle(v); return this; }
        public Builder description(String v){ e.setDescription(v); return this; }
        public Builder durationMinutes(int v){ e.setDurationMinutes(v); return this; }
        public Builder marksPerQuestion(int v){ e.setMarksPerQuestion(v); return this; }
        public Builder status(Exam.ExamStatus v){ e.setStatus(v); return this; }
        public Builder scheduledAt(LocalDateTime v){ e.setScheduledAt(v); return this; }
        public Builder totalQuestions(int v){ e.setTotalQuestions(v); return this; }
        public Builder questions(List<QuestionDto> v){ e.setQuestions(v); return this; }
        public ExamDto build(){ return e; }
    }
}
