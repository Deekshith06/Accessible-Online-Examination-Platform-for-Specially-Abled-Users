package com.accessexam.dto;

import java.util.List;

/**
 * Question DTO — sent to the frontend during an active exam.
 * IMPORTANT: correctOption is NEVER included here to prevent cheating.
 */
public class QuestionDto {
    private Long id;
    private String questionText;
    private List<String> options;   // [A, B, C, D]
    private int orderIndex;

    public QuestionDto() {}

    public Long getId(){ return id; }
    public String getQuestionText(){ return questionText; }
    public List<String> getOptions(){ return options; }
    public int getOrderIndex(){ return orderIndex; }

    public void setId(Long id){ this.id = id; }
    public void setQuestionText(String q){ this.questionText = q; }
    public void setOptions(List<String> o){ this.options = o; }
    public void setOrderIndex(int i){ this.orderIndex = i; }

    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private QuestionDto q = new QuestionDto();
        public Builder id(Long id){ q.setId(id); return this; }
        public Builder questionText(String t){ q.setQuestionText(t); return this; }
        public Builder options(List<String> o){ q.setOptions(o); return this; }
        public Builder orderIndex(int i){ q.setOrderIndex(i); return this; }
        public QuestionDto build(){ return q; }
    }
}
