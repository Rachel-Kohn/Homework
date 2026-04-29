import express from 'express';
import { MongoClient } from 'mongodb';
import session from 'express-session';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'hjs');
app.set('views', './views');

const client = new MongoClient('mongodb://localhost:27017');

let postsCollection;
let usersCollection;

async function start() {
  await client.connect();
  const db = client.db('blog');
  postsCollection = db.collection('posts');
  usersCollection = db.collection('users');

  app.listen(3000, () => console.log('http://localhost:3000'));
}

start();

app.get('/', async (req, res) => {
  const posts = await postsCollection.find().toArray();

  res.render('layout', {
    title: 'Portugal Blog',
    posts,
    user: req.session.user,
    partials: { content: 'index' }
  });
});

app.get('/addPost', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  res.render('layout', {
    title: 'Add Post',
    user: req.session.user,
    partials: { content: 'addPost' }
  });
});

app.post('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  await postsCollection.insertOne({
    title: req.body.title,
    body: req.body.body,
    author: req.session.user.username,
    date: new Date(),
    comments: []
  });

  res.redirect('/');
});



app.get('/login', (req, res) => {
  res.render('layout', {
    title: 'Login',
    partials: { content: 'login' }
  });
});

app.get('/register', (req, res) => {
  res.render('layout', {
    title: 'Register',
    partials: { content: 'register' }
  });
});

app.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  await usersCollection.insertOne({
    username: req.body.username,
    hash
  });

  res.redirect('/login');
});

app.post('/login', async (req, res) => {
  const user = await usersCollection.findOne({
    username: req.body.username
  });

  if (!user) return res.send('Invalid login');

  const match = await bcrypt.compare(req.body.password, user.hash);
  if (!match) return res.send('Invalid login');

  req.session.user = user;

  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});