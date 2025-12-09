import "../styles/home-page.scss"
import {useEffect, useState} from "react";
import type {TriviaQuestion, TriviaResponse} from "../types/trivia.ts";
import {decodeHtml} from "../utils/decodeHtml.ts";

const HomePage = () => {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) as { username: string } : null;

    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [answer, setAnswer] = useState<string | null>(null);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchQuestions() {
        try {
            setLoading(true);
            const res = await fetch(
                "https://opentdb.com/api.php?amount=10&category=9&type=boolean"
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
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Unknown error fetching questions");
        } finally {
            setLoading(false);
        }
    }

    const handleTrue = () => {
        if (questions[count].correct_answer == "True") {
            setAnswer("Correct!")
        } else {
            setAnswer("Wrong")
        }
    };

    const handleFalse = () => {
        if (questions[count].correct_answer == "False") {
            setAnswer("Correct!")
        } else {
            setAnswer("Wrong")
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
                <p>Welcome, <strong>{user.username}</strong>!</p>
            ) : (
                <p>You are not logged in.</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && (
                <div className={"home__trivia-question"}>
                    <h2>Question:</h2>
                    <h3>{decodeHtml(questions[count]?.question)}</h3>

                    {answer == null &&(
                        <div className={"home__trivia-question--buttons"}>
                            <button onClick={handleTrue}>True</button>
                            <button onClick={handleFalse}>False</button>
                        </div>
                    )}

                    <div>
                        <p>{answer}</p>
                    </div>

                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            )}
        </main>
    );
};
export default HomePage;