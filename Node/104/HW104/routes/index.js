const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  if (!req.session.visits) {
    req.session.visits = 0;
  }

  req.session.visits++;

  const targets = '🎯 '.repeat(req.session.visits);

  res.render('index', {
    visits: req.session.visits,
    targets: targets
  });

});

router.post('/username', (req, res) => {

  const username = req.body.username || 'Guest';
  req.session.username = username;

  res.redirect('/');

});

module.exports = router;