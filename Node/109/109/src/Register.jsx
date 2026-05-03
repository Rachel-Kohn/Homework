import { useState } from 'react';

export default function Register({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error('Register failed');

            const user = await res.json();
            setUser(user.username);

        } catch (err) {
            console.error(err);
            alert('Register failed');
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <button className='add-btn'>Register</button>
        </form>
    );
}