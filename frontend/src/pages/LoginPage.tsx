import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import type { UserResponse } from '../api';
import '../styles/login-page.scss';

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
        <main className={"login"}>
            <form
                onSubmit={handleSubmit}
                className={"login__form"}
            >
                <h1>Login</h1>

                <label className={"login__form--label"}>
                    <p>Username</p>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label className={"login__form--label"}>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" disabled={loading} className={"login__form--button"}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p>
                    Don&apos;t have an account? <Link to="/register">Register</Link>
                </p>
            </form>

            {error && (
                <p>
                    {error}
                </p>
            )}
        </main>
    );
};
export default LoginPage;
