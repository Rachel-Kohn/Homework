import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.use((req, res, next) => {
    try {
        req.users = req.db.collection('users');
        next();
    } catch (e) {
        next(e);
    }
});

// REGISTER
router.post('/register', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        await req.users.insertOne({
            username: req.body.username,
            hash
        });

        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
});

// LOGIN
router.post('/login', async (req, res, next) => {
    try {
        const user = await req.users.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(401).send('Invalid login');
        }

        const match = await bcrypt.compare(req.body.password, user.hash);

        if (!match) {
            return res.status(401).send('Invalid login');
        }

        req.session.user = user;

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

export default router;