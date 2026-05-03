import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AddPost from './AddPost';
import Post from './Post';

const socket = io('http://localhost:8080');

export default function PostsWithComments({ user }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then(res => res.json())
            .then(setPosts);
    }, []);

    useEffect(() => {
        const reload = async () => {
            const res = await fetch('http://localhost:8080/posts');
            const data = await res.json();
            setPosts(data);
        };

        socket.on('comment', reload);

        socket.on('post', newPost => {
            setPosts(prev => [newPost, ...prev]);
        });

        socket.on('deletePost', id => {
            setPosts(prev => prev.filter(p => p._id !== id));
        });

        return () => {
            socket.off('comment', reload);
            socket.off('post');
            socket.off('deletePost');
        };
    }, []);

    return (
        <>
            <AddPost user={user} />

            {/* POSTS */}
            {posts.map(p => (
                <Post key={p._id} post={p} user={user} />
            ))}
        </>
    );
}