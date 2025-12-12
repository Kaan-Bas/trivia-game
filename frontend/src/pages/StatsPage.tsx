import {useEffect, useState} from "react";
import {getUserStats, type UserResponse, type UserStatsResponse} from "../api.ts";
import "../styles/stats-page.scss"

const StatsPage = () => {
    const stored = localStorage.getItem("user");
    const user = stored ? (JSON.parse(stored) as UserResponse) : null;

    const [stats, setStats] = useState<UserStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getUserStats(user.username);
                setStats(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError("Failed to load stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user?.username]);

    return(
        <main className={"stats"}>
            {error && (
                <p>{error}</p>
            )}
            {!loading && (
                <div className={"stats__content"}>
                    <h2 className={"stats__content--title"}>Statistics for user: {user?.username}</h2>

                    <p>Total answered questions: {stats?.totalQuestionsAnswered}</p>

                    <p>Correctly answered questions: {stats?.totalCorrectAnswers}</p>

                    <p>Percentage of questions answered correctly: {stats?.accuracy}%</p>
                </div>
            )}
        </main>
    );
}

export default StatsPage;
