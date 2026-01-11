import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header>
            <h1>PseudoPost</h1>
            <h2>The blog that isn’t</h2>
            {location.pathname !== '/' && (
                <Link className="home-link" to="/">Home</Link>
            )}
        </header>
    );
}