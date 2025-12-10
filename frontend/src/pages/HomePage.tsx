import "../styles/home-page.scss";
import { useEffect, useState } from "react";
import type { TriviaQuestion, TriviaResponse } from "../types/trivia";
import { decodeHtml } from "../utils/decodeHtml";
import { updateUserStats } from "../api";

const HomePage = () => {
    const stored = localStorage.getItem("user");
    const user = stored ? (JSON.parse(stored) as { username: string }) : null;

    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [answer, setAnswer] = useState<string | null>(null);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchQuestions() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(
                "https://opentdb.com/api.php?amount=10&category=9&type=boolean",
            );
            const data = (await res.json()) as TriviaResponse;

            if (res.status === 429) {
                console.warn("Rate limited (429) — keeping existing questions");
                return;
            }

            if (!res.ok) {
                throw new Error(`Failed to fetch trivia questions (${res.status})`);
            }

            setQuestions(data.results);
            setCount(0);
            setAnswer(null);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Unknown error fetching trivia questions");
        } finally {
            setLoading(false);
        }
    }

    const handleAnswer = async (selected: "True" | "False") => {
        const current = questions[count];
        if (!current) return;

        const isCorrect = current.correct_answer === selected;

        setAnswer(isCorrect ? "Correct!" : "Wrong");

        if (!user) {
            return;
        }

        try {
            await updateUserStats(user.username, isCorrect);
        } catch (err) {
            console.error("Failed to update stats", err);
        }
    };

    const handleNextQuestion = () => {
        setCount(prev => prev + 1);
        setAnswer(null);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (count > 9) {
            fetchQuestions();
        }
    }, [count]);

    return (
        <main className={"home"}>
            {user ? (
                <h4>Welcome, {user.username}!</h4>
            ) : (
                <h1>Log in to get trivia questions</h1>
            )}

            {error && (
                <p>{error}</p>
            )}

            {user && !loading && (
                <div className={"home__trivia-question"}>
                    <h2>Question:</h2>
                    <h3>{decodeHtml(questions[count]?.question)}</h3>

                    {answer == null && (
                        <div className="home__trivia-question--buttons">
                            <button className={"home__trivia-question--buttons--true"} onClick={() => handleAnswer("True")}>True</button>
                            <button className={"home__trivia-question--buttons--false"} onClick={() => handleAnswer("False")}>False</button>
                        </div>
                    )}

                    {answer != null && (
                        <p className={"home__trivia-question--answer"}>{answer}</p>
                    )}

                    <button className={"home__trivia-question--next-question"} onClick={handleNextQuestion}>Next Question</button>
                </div>
            )}
        </main>
    );
};

export default HomePage;
