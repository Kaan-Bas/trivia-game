import {Link} from "react-router-dom";
import '../styles/nav-component.scss';

const NavComponent = () => {
    return (
        <div className={"nav"}>
            <div>
                <h1>Trivia Game</h1>
            </div>
            <div className={"nav__links"}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};
export default NavComponent;