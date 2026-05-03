import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'hjs');
app.set('views', './views');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let postsCollection;

async function connectDB() {
  await client.connect();
  const db = client.db('blog');
  postsCollection = db.collection('posts');
  console.log('Connected to MongoDB');
}

connectDB();

app.get('/', async (req, res) => {
  const posts = await postsCollection.find().toArray();

  res.render('layout', {
    title: 'Portugal Blog',
    posts: posts,
    partials: {
      content: 'index'
    }
  });
});

app.get('/addPost', (req, res) => {
  res.render('layout', {
    title: 'Add Post',
    partials: {
      content: 'addPost'
    }
  });
});

app.post('/', async (req, res) => {
  const newPost = {
    title: req.body.title,
    body: req.body.body,
    author: 'donald',
    date: new Date()
  };

  await postsCollection.insertOne(newPost);

  res.redirect('/');
});

app.get('/posts', async (req, res) => {
  const posts = await postsCollection.find().toArray();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const newPost = req.body;
  await postsCollection.insertOne(newPost);
  res.status(201).json(newPost);
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});