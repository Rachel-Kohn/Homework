import { Link } from 'react-router';

export default function NotFound() {
    return (
        <>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Go back home</Link>
        </>
    );
}