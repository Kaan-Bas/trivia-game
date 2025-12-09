import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import type { UserResponse } from '../api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const user: UserResponse = await loginUser(username, password);

            // For now: store user in localStorage (later: JWT, context, etc.)
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Login</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                }}
            >
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {error && (
                <p style={{ color: 'red', marginTop: '1rem' }}>
                    {error}
                </p>
            )}

            <p style={{ marginTop: '1rem' }}>
                Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
        </main>
    );
};
export default LoginPage;
