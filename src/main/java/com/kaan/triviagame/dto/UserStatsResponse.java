package com.kaan.triviagame.dto;

public class UserStatsResponse {

    private String username;
    private int totalCorrectAnswers;
    private int totalQuestionsAnswered;
    private double accuracy;

    public UserStatsResponse(String username, int totalCorrectAnswers, int totalQuestionsAnswered) {
        this.username = username;
        this.totalCorrectAnswers = totalCorrectAnswers;
        this.totalQuestionsAnswered = totalQuestionsAnswered;
        this.accuracy = totalQuestionsAnswered == 0
                ? 0.0
                : (totalCorrectAnswers * 100.0) / totalQuestionsAnswered;
    }

    public String getUsername() {
        return username;
    }

    public int getTotalCorrectAnswers() {
        return totalCorrectAnswers;
    }

    public int getTotalQuestionsAnswered() {
        return totalQuestionsAnswered;
    }

    public double getAccuracy() {
        return accuracy;
    }
}
