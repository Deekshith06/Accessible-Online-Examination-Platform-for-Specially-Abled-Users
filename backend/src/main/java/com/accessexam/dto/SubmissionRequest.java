package com.accessexam.dto;

import java.util.List;

/** Request body for POST /api/submissions/submit */
public class SubmissionRequest {
    private Long attemptId;
    private List<AnswerItem> answers;

    public SubmissionRequest() {}
    public Long getAttemptId(){ return attemptId; }
    public List<AnswerItem> getAnswers(){ return answers; }
    public void setAttemptId(Long v){ this.attemptId = v; }
    public void setAnswers(List<AnswerItem> v){ this.answers = v; }

    public static class AnswerItem {
        private Long questionId;
        private int selectedOption;  // 0=A,1=B,2=C,3=D, -1=unanswered
        public AnswerItem() {}
        public Long getQuestionId(){ return questionId; }
        public int getSelectedOption(){ return selectedOption; }
        public void setQuestionId(Long v){ this.questionId = v; }
        public void setSelectedOption(int v){ this.selectedOption = v; }
    }
}
