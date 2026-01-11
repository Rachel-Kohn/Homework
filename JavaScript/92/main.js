import { fetchUsers, fetchPostsByUser, fetchCommentsByPost } from './api.js';

const app = document.getElementById('app');
const homeLink = document.getElementById('homeLink');

const likes = {};
let usersCache = [];

homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadHome();
});

async function loadHome() {
    app.innerHTML = '<p>Loading blog feed...</p>';

    if (!usersCache.length) {
        usersCache = await fetchUsers();
    }

    const postsByUser = await Promise.all(usersCache.map(u => fetchPostsByUser(u.id)));
    const allPosts = postsByUser.flat();

    allPosts.sort(() => Math.random() - 0.5);

    app.innerHTML = allPosts.slice(0, 20)
        .map(post => {
            const user = usersCache.find(u => u.id === post.userId);
            return renderPostPreview(post, user);
        }).join('');

    attachHomeHandlers();
}

function renderPostPreview(post, user) {
    const likeCount = likes[post.id] || 0;
    return `
    <div class='post-preview'>
      <h3>${post.title}</h3>
      <p>${post.body.slice(0, 120)}...</p>
      <p>by <a href='#' data-user='${user.id}'>${user.name}</a></p>
      <button data-like='${post.id}'>❤️ Like</button> <span id='likes-${post.id}'>${likeCount}</span>
      <button data-post='${post.id}'>Show Comments</button>
      <div class='comments' id='comments-${post.id}'></div>
    </div>
  `;
}

function attachHomeHandlers() {
    document.querySelectorAll('a[data-user]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadUserBlog(link.dataset.user);
        });
    });

    document.querySelectorAll('button[data-like]').forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = Number(btn.dataset.like);
            likes[postId] = (likes[postId] || 0) + 1;
            document.getElementById(`likes-${postId}`).textContent = likes[postId];
        });
    });

    document.querySelectorAll('button[data-post]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const postId = Number(btn.dataset.post);
            const container = document.getElementById(`comments-${postId}`);
            if (container.innerHTML) {
                container.innerHTML = '';
                btn.textContent = 'Show Comments';
            } else {
                btn.textContent = 'Hide Comments';
                const comments = await fetchCommentsByPost(postId);
                container.innerHTML = comments
                    .map(c => `<p><strong>${c.name}:</strong> ${c.body}</p>`)
                    .join('');
            }
        });
    });
}

async function loadUserBlog(userId) {
    const user = usersCache.find(u => u.id === Number(userId));
    app.innerHTML = '<p>Loading user blog...</p>';

    const posts = await fetchPostsByUser(Number(userId));

    app.innerHTML = `
    <section class='user-header'>
      <h1>${user.name}</h1>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    </section>
    ${posts.map(renderUserPost).join('')}
  `;

    attachUserPostHandlers();
}

function renderUserPost(post) {
    const likeCount = likes[post.id] || 0;
    return `
    <div class='post'>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <div class='post-actions'>
        <button data-like='${post.id}'>❤️ Like</button> <span id='likes-${post.id}'>${likeCount}</span>
        <button data-post='${post.id}'>Show Comments</button>
      </div>
      <div class='comments' id='comments-${post.id}'></div>
    </div>
  `;
}

function attachUserPostHandlers() {
    document.querySelectorAll('button[data-like]').forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = Number(btn.dataset.like);
            likes[postId] = (likes[postId] || 0) + 1;
            document.getElementById(`likes-${postId}`).textContent = likes[postId];
        });
    });

    document.querySelectorAll('button[data-post]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const postId = Number(btn.dataset.post);
            const container = document.getElementById(`comments-${postId}`);
            if (container.innerHTML) {
                container.innerHTML = '';
                btn.textContent = 'Show Comments';
            } else {
                btn.textContent = 'Hide Comments';
                const comments = await fetchCommentsByPost(postId);
                container.innerHTML = comments
                    .map(c => `<p><strong>${c.name}:</strong> ${c.body}</p>`)
                    .join('');
            }
        });
    });
}

(async function init() {
    usersCache = await fetchUsers();
    loadHome();
})();