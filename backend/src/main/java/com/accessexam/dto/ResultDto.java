package com.accessexam.dto;

import java.util.List;

/** Response body for POST /api/submissions/submit — full result with per-question breakdown */
public class ResultDto {
    private Long attemptId;
    private Long examId;
    private String examTitle;
    private int score;          // number of correct answers
    private int total;          // total questions
    private int totalMarks;     // score × marksPerQuestion
    private int maxMarks;       // total × marksPerQuestion
    private double percentage;
    private boolean passed;     // >= 40%
    private String timeTaken;   // "HH:MM:SS"
    private String grade;       // A, B, C, D, F
    private List<QuestionResult> breakdown;

    public ResultDto() {}

    // Getters and setters
    public Long getAttemptId(){ return attemptId; }
    public Long getExamId(){ return examId; }
    public String getExamTitle(){ return examTitle; }
    public int getScore(){ return score; }
    public int getTotal(){ return total; }
    public int getTotalMarks(){ return totalMarks; }
    public int getMaxMarks(){ return maxMarks; }
    public double getPercentage(){ return percentage; }
    public boolean isPassed(){ return passed; }
    public String getTimeTaken(){ return timeTaken; }
    public String getGrade(){ return grade; }
    public List<QuestionResult> getBreakdown(){ return breakdown; }

    public void setAttemptId(Long v){ this.attemptId = v; }
    public void setExamId(Long v){ this.examId = v; }
    public void setExamTitle(String v){ this.examTitle = v; }
    public void setScore(int v){ this.score = v; }
    public void setTotal(int v){ this.total = v; }
    public void setTotalMarks(int v){ this.totalMarks = v; }
    public void setMaxMarks(int v){ this.maxMarks = v; }
    public void setPercentage(double v){ this.percentage = v; }
    public void setPassed(boolean v){ this.passed = v; }
    public void setTimeTaken(String v){ this.timeTaken = v; }
    public void setGrade(String v){ this.grade = v; }
    public void setBreakdown(List<QuestionResult> v){ this.breakdown = v; }

    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private ResultDto r = new ResultDto();
        public Builder attemptId(Long v){ r.setAttemptId(v); return this; }
        public Builder examId(Long v){ r.setExamId(v); return this; }
        public Builder examTitle(String v){ r.setExamTitle(v); return this; }
        public Builder score(int v){ r.setScore(v); return this; }
        public Builder total(int v){ r.setTotal(v); return this; }
        public Builder totalMarks(int v){ r.setTotalMarks(v); return this; }
        public Builder maxMarks(int v){ r.setMaxMarks(v); return this; }
        public Builder percentage(double v){ r.setPercentage(v); return this; }
        public Builder passed(boolean v){ r.setPassed(v); return this; }
        public Builder timeTaken(String v){ r.setTimeTaken(v); return this; }
        public Builder grade(String v){ r.setGrade(v); return this; }
        public Builder breakdown(List<QuestionResult> v){ r.setBreakdown(v); return this; }
        public ResultDto build(){ return r; }
    }

    public static class QuestionResult {
        private Long questionId;
        private String questionText;
        private int selectedOption;
        private int correctOption;
        private boolean isCorrect;
        private List<String> options;

        public QuestionResult() {}

        public Long getQuestionId(){ return questionId; }
        public String getQuestionText(){ return questionText; }
        public int getSelectedOption(){ return selectedOption; }
        public int getCorrectOption(){ return correctOption; }
        public boolean isIsCorrect(){ return isCorrect; }
        public List<String> getOptions(){ return options; }

        public void setQuestionId(Long v){ this.questionId = v; }
        public void setQuestionText(String v){ this.questionText = v; }
        public void setSelectedOption(int v){ this.selectedOption = v; }
        public void setCorrectOption(int v){ this.correctOption = v; }
        public void setIsCorrect(boolean v){ this.isCorrect = v; }
        public void setOptions(List<String> v){ this.options = v; }

        // Builder
        public static Builder builder(){ return new Builder(); }
        public static class Builder{
            private QuestionResult q = new QuestionResult();
            public Builder questionId(Long v){ q.setQuestionId(v); return this; }
            public Builder questionText(String v){ q.setQuestionText(v); return this; }
            public Builder selectedOption(int v){ q.setSelectedOption(v); return this; }
            public Builder correctOption(int v){ q.setCorrectOption(v); return this; }
            public Builder isCorrect(boolean v){ q.setIsCorrect(v); return this; }
            public Builder options(List<String> v){ q.setOptions(v); return this; }
            public QuestionResult build(){ return q; }
        }
    }
}
