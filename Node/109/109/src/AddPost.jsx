import { useState } from 'react';

export default function AddPost({ user }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    title,
                    body,
                    author: user
                })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            console.log('Post added');

            setTitle('');
            setBody('');

        } catch (err) {
            console.error(err);
            alert('Failed to add post');
        }
    }

    return (
        <form onSubmit={submit} className='post-form'>
            <input
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                placeholder='Write something...'
                value={body}
                onChange={e => setBody(e.target.value)}
            />
            <button>Add Post</button>
        </form>
    );
}