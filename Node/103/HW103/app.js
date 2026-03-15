const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const username = req.signedCookies.username || '';
  res.locals.username = username;
  next();
});

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;