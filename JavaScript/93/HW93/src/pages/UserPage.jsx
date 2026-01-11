import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUsers, fetchPostsByUser } from '../api';
import UserHeader from '../components/UserHeader';
import PostCard from '../components/PostCard';

export default function UserPage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);

    const POSTS_PER_PAGE = 3;

    useEffect(() => {
        fetchUsers().then(users => {
            const u = users.find(u => u.id === Number(userId));
            setUser(u);
        });

        fetchPostsByUser(userId).then(setPosts);
    }, [userId]);

    if (!user) return <p>Loading user...</p>;

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const start = page * POSTS_PER_PAGE;
    const pagedPosts = posts.slice(start, start + POSTS_PER_PAGE);

    return (
        <main>
            <UserHeader user={user} />
            {pagedPosts.map(post => (
                <PostCard key={post.id} post={post} user={user} />
            ))}

            <div className="pagination">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
                <span>Page {page + 1} / {totalPages}</span>
                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </main>
    );
}