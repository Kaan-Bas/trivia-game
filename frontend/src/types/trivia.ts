export type TriviaQuestion = {
    category: string;
    type: "boolean";
    difficulty: string;
    question: string;
    correct_answer: "True" | "False";
    incorrect_answers: string[];
};

export type TriviaResponse = {
    response_code: number;
    results: TriviaQuestion[];
};
