const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'target-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const username = req.session.username || '';
  res.locals.username = username;
  next();
});

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;