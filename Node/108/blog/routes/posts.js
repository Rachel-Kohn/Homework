import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    try {
        req.posts = req.db.collection('posts');
        next();
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const posts = await req.posts.find().toArray();
        res.json(posts);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        // 🚨 MUST be logged in
        if (!req.session.user) {
            return res.status(401).send('You must be logged in');
        }

        const newPost = {
            title: req.body.title,
            body: req.body.body,
            author: req.session.user.username,
            date: new Date()
        };

        await req.posts.insertOne(newPost);

        res.status(201).json(newPost);
    } catch (e) {
        next(e);
    }
});

export default router;