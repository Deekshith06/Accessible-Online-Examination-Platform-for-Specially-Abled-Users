package com.accessexam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** Request body for POST/PUT /api/questions (Admin only) */
public class QuestionRequest {

    @NotNull(message = "Exam ID is required")
    private Long examId;

    @NotBlank(message = "Question text is required")
    private String questionText;

    @NotBlank private String optionA;
    @NotBlank private String optionB;
    @NotBlank private String optionC;
    @NotBlank private String optionD;

    /** 0=A, 1=B, 2=C, 3=D */
    private int correctOption;

    private int orderIndex;

    public QuestionRequest() {}
    public Long getExamId(){ return examId; }
    public String getQuestionText(){ return questionText; }
    public String getOptionA(){ return optionA; }
    public String getOptionB(){ return optionB; }
    public String getOptionC(){ return optionC; }
    public String getOptionD(){ return optionD; }
    public int getCorrectOption(){ return correctOption; }
    public int getOrderIndex(){ return orderIndex; }

    public void setExamId(Long v){ this.examId = v; }
    public void setQuestionText(String v){ this.questionText = v; }
    public void setOptionA(String v){ this.optionA = v; }
    public void setOptionB(String v){ this.optionB = v; }
    public void setOptionC(String v){ this.optionC = v; }
    public void setOptionD(String v){ this.optionD = v; }
    public void setCorrectOption(int v){ this.correctOption = v; }
    public void setOrderIndex(int v){ this.orderIndex = v; }
}
