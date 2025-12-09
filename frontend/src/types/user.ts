export type UserResponse = {
    id: number;
    username: string;
    email: string;
};

export type UserStatsResponse = {
    username: string;
    totalCorrectAnswers: number;
    totalQuestionsAnswered: number;
    accuracy: number;
};