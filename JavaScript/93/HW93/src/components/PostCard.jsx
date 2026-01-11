import { useState } from 'react';
import { fetchCommentsByPost } from '../api';

export default function PostCard({ post, user }) {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    const toggleComments = async () => {
        if (showComments) {
            setShowComments(false);
        } else {
            if (!comments.length) {
                const data = await fetchCommentsByPost(post.id);
                setComments(data);
            }
            setShowComments(true);
        }
    };

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>by {user.name}</p>
            <div className="post-actions">
                <button data-like onClick={() => setLikes(likes + 1)}>❤️ Like {likes}</button>
                <button data-post onClick={toggleComments}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>
            {showComments && (
                <div className="comments">
                    {comments.map(c => (
                        <p key={c.id}><strong>{c.name}:</strong> {c.body}</p>
                    ))}
                </div>
            )}
        </div>
    );
}