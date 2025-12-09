const HomePage = () => {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) as { username: string } : null;
    return (
        <div>
            <h1>Trivia Game (Home)</h1>
            {user ? (
                <p>Welcome, <strong>{user.username}</strong>!</p>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};
export default HomePage;