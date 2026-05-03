import { useState } from 'react';

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error('Login failed');

            const user = await res.json();
            setUser(user.username);

        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <button className='add-btn'>Login</button>
        </form>
    );
}