import { useState } from 'react';

export default function AddComment({ id, user, setAdding }) {
    const [body, setBody] = useState('');

    async function submit(e) {
        e.preventDefault();

        await fetch(`http://localhost:8080/posts/${id}/comments`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ body, author: user })
        });

        setAdding(false);
    }

    return (
        <form onSubmit={submit}>
            <input value={body} onChange={e => setBody(e.target.value)} />
            <button>Add</button>
        </form>
    );
}