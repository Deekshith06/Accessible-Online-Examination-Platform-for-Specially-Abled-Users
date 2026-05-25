package com.accessexam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Answer entity — one selected option for one question in one attempt.
 * selectedOption = -1 means unanswered.
 */
@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private ExamAttempt attempt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    /**
     * 0=A, 1=B, 2=C, 3=D, -1=unanswered
     */
    @Column(name = "selected_option")
    private int selectedOption = -1;

    public Answer() { this.selectedOption = -1; }

    public Answer(ExamAttempt attempt, Question question, int selectedOption){
        this.attempt = attempt;
        this.question = question;
        this.selectedOption = selectedOption;
    }

    public Long getId(){ return id; }
    public ExamAttempt getAttempt(){ return attempt; }
    public Question getQuestion(){ return question; }
    public int getSelectedOption(){ return selectedOption; }

    public void setId(Long id){ this.id = id; }
    public void setAttempt(ExamAttempt attempt){ this.attempt = attempt; }
    public void setQuestion(Question question){ this.question = question; }
    public void setSelectedOption(int selectedOption){ this.selectedOption = selectedOption; }
    
    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private Answer a = new Answer();
        public Builder attempt(ExamAttempt at){ a.setAttempt(at); return this; }
        public Builder question(Question q){ a.setQuestion(q); return this; }
        public Builder selectedOption(int s){ a.setSelectedOption(s); return this; }
        public Answer build(){ return a; }
    }
}
