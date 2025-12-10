import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/nav-component.scss";

type User = {
    id: number;
    username: string;
    email: string;
};

const NavComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        setUser(stored ? (JSON.parse(stored) as User) : null);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <main className="nav">
            <div>
                <h1>Trivia Game</h1>
            </div>

            <div className="nav__links">
                <Link to="/">Home</Link>
                {user && (
                    <Link to="/stats">Stats</Link>
                )}

                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {user && (
                    <button
                        className="nav__logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </main>
    );
};

export default NavComponent;
