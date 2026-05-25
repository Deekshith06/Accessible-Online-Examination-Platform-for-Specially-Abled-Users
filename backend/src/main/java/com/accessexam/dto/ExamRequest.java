package com.accessexam.dto;

import java.time.LocalDateTime;

import com.accessexam.entity.Exam;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** Request body for POST/PUT /api/exams (Admin only) */
public class ExamRequest {

    @NotBlank(message = "Exam title is required")
    private String title;

    private String description;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int durationMinutes = 60;

    @Min(value = 1, message = "Marks per question must be at least 1")
    private int marksPerQuestion = 4;

    @NotNull(message = "Status is required")
    private Exam.ExamStatus status = Exam.ExamStatus.UPCOMING;

    private LocalDateTime scheduledAt;

    public ExamRequest() {}
    public String getTitle(){ return title; }
    public String getDescription(){ return description; }
    public int getDurationMinutes(){ return durationMinutes; }
    public int getMarksPerQuestion(){ return marksPerQuestion; }
    public Exam.ExamStatus getStatus(){ return status; }
    public LocalDateTime getScheduledAt(){ return scheduledAt; }

    public void setTitle(String t){ this.title = t; }
    public void setDescription(String d){ this.description = d; }
    public void setDurationMinutes(int m){ this.durationMinutes = m; }
    public void setMarksPerQuestion(int m){ this.marksPerQuestion = m; }
    public void setStatus(Exam.ExamStatus s){ this.status = s; }
    public void setScheduledAt(LocalDateTime l){ this.scheduledAt = l; }
}
