const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err));

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    date: Date,
    comments: Array,
    likes: Array
});

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String
});

const Post = mongoose.model('Post', PostSchema);
const User = mongoose.model('User', UserSchema);

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).send('User exists');

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ username, hash });
        await newUser.save();

        res.json({ username });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');

    const valid = await bcrypt.compare(password, user.hash);
    if (!valid) return res.status(400).send('Wrong password');

    res.json({ username: user.username });
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    try {
        const { title, body, author } = req.body;

        const newPost = new Post({
            title,
            body,
            author,
            date: new Date(),
            comments: [],
            likes: []
        });

        await newPost.save();

        io.emit('post', newPost);

        res.json(newPost);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);

    io.emit('deletePost', req.params.id);

    res.send('Deleted');
});

app.post('/posts/:id/comments', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    const newComment = {
        body: req.body.body,
        author: req.body.author,
        date: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    io.emit('comment', {
        postId: post._id.toString(),
        comment: newComment
    });

    res.json(newComment);
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});