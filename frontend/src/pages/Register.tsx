import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import type { UserResponse } from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdUser, setCreatedUser] = useState<UserResponse | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setCreatedUser(null);
        setLoading(true);

        try {
            const user = await registerUser(username, email, password);
            setCreatedUser(user);
            navigate('/login');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Register</h1>

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
                        minLength={3}
                    />
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        minLength={6}
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {error && (
                <p style={{ color: 'red', marginTop: '1rem' }}>
                    {error}
                </p>
            )}

            {createdUser && (
                <p style={{ color: 'green', marginTop: '1rem' }}>
                    Account created for <strong>{createdUser.username}</strong>.{' '}
                    <button type="button" onClick={() => navigate('/login')}>
                        Go to login
                    </button>
                </p>
            )}

            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </main>
    );
};
export default Register
