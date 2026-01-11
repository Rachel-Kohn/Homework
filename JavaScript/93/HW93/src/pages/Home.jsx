import { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import { Link } from 'react-router-dom';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <main>
            {users.map(user => (
                <div key={user.id} className="user-preview">
                    <h3>{user.name}</h3>
                    <p>{user.company.name}</p>
                    <p>{user.website}</p>
                    <Link to={`/user/${user.id}`}>View Blog</Link>
                </div>
            ))}
        </main>
    );
}