import "../styles/home-page.scss"

const HomePage = () => {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) as { username: string } : null;

    return (
        <main className={"home"}>
            <h1>Trivia Game</h1>
            {user ? (
                <p>Welcome, <strong>{user.username}</strong>!</p>
            ) : (
                <p>You are not logged in.</p>
            )}
        </main>
    );
};
export default HomePage;