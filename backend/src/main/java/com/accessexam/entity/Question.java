package com.accessexam.entity;

import jakarta.persistence.*;

/**
 * Question entity — one question belonging to an exam.
 */
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Column(name = "option_a", nullable = false)
    private String optionA;

    @Column(name = "option_b", nullable = false)
    private String optionB;

    @Column(name = "option_c", nullable = false)
    private String optionC;

    @Column(name = "option_d", nullable = false)
    private String optionD;

    @Column(name = "correct_option")
    private int correctOption = 0;

    @Column(name = "order_index")
    private int orderIndex;

    public Question() { this.correctOption = 0; }

    public Question(Long id, Exam exam, String questionText, String optionA, String optionB,
                    String optionC, String optionD, int correctOption, int orderIndex) {
        this.id = id; this.exam = exam; this.questionText = questionText; this.optionA = optionA;
        this.optionB = optionB; this.optionC = optionC; this.optionD = optionD;
        this.correctOption = correctOption; this.orderIndex = orderIndex;
    }

    public Long getId(){ return id; }
    public Exam getExam(){ return exam; }
    public String getQuestionText(){ return questionText; }
    public String getOptionA(){ return optionA; }
    public String getOptionB(){ return optionB; }
    public String getOptionC(){ return optionC; }
    public String getOptionD(){ return optionD; }
    public int getCorrectOption(){ return correctOption; }
    public int getOrderIndex(){ return orderIndex; }

    public void setId(Long id){ this.id = id; }
    public void setExam(Exam exam){ this.exam = exam; }
    public void setQuestionText(String q){ this.questionText = q; }
    public void setOptionA(String a){ this.optionA = a; }
    public void setOptionB(String b){ this.optionB = b; }
    public void setOptionC(String c){ this.optionC = c; }
    public void setOptionD(String d){ this.optionD = d; }
    public void setCorrectOption(int c){ this.correctOption = c; }
    public void setOrderIndex(int idx){ this.orderIndex = idx; }

    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private Question q = new Question();
        public Builder id(Long id){ q.setId(id); return this; }
        public Builder exam(Exam e){ q.setExam(e); return this; }
        public Builder questionText(String t){ q.setQuestionText(t); return this; }
        public Builder optionA(String a){ q.setOptionA(a); return this; }
        public Builder optionB(String b){ q.setOptionB(b); return this; }
        public Builder optionC(String c){ q.setOptionC(c); return this; }
        public Builder optionD(String d){ q.setOptionD(d); return this; }
        public Builder correctOption(int c){ q.setCorrectOption(c); return this; }
        public Builder orderIndex(int i){ q.setOrderIndex(i); return this; }
        public Question build(){ return q; }
    }
}
