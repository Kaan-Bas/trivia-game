const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

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

export async function registerUser(
    username: string,
    email: string,
    password: string,
): Promise<UserResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to register");
    }

    return res.json();
}

export async function loginUser(
    username: string,
    password: string,
): Promise<UserResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to login");
    }

    return res.json();
}

export async function updateUserStats(
    username: string,
    wasCorrect: boolean,
): Promise<UserStatsResponse> {
    const res = await fetch(`${API_BASE_URL}/api/stats/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            correctAnswers: wasCorrect ? 1 : 0,
            totalQuestions: 1,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update stats");
    }

    return res.json();
}

export async function getUserStats(username: string): Promise<UserStatsResponse> {
    const res = await fetch(`${API_BASE_URL}/api/stats/${encodeURIComponent(username)}`);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch user stats");
    }

    return res.json();
}
