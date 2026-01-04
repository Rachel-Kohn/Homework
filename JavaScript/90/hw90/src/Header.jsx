import { NavLink, Link } from 'react-router';

export default function Header() {
    return (
        <header className="site-header">
            <h1 className="logo">Homes R Us</h1>

            <nav>
                <Link to="/">Home</Link> |{" "}
                <NavLink to="/buy">Buy a Home</NavLink> |{" "}
                <NavLink to="/sell">Sell a Home</NavLink> |{" "}
                <Link to="/does-not-exist">Broken Link</Link>
            </nav>
        </header>
    );
}