import { useState } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';

export default function Post({ post, user }) {
    const [adding, setAdding] = useState(false);

    async function deletePost() {
        try {
            const res = await fetch(`http://localhost:8080/posts/${post._id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

        } catch (err) {
            console.error(err);
            alert('Failed to delete post');
        }
    }

    return (
        <div className='post'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <small>by {post.author}</small>

            {/* 🔥 ONLY OWNER CAN DELETE */}
            {post.author === user && (
                <button onClick={deletePost}>Delete</button>
            )}

            {post.comments?.map((c, i) => (
                <Comment key={i} comment={c} />
            ))}

            {adding ? (
                <AddComment id={post._id} user={user} setAdding={setAdding} />
            ) : (
                <button onClick={() => setAdding(true)}>Add Comment</button>
            )}
        </div>
    );
}