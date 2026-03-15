const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const visits = parseInt(req.signedCookies.visits) || 0;
  const newVisits = visits + 1;

  res.cookie('visits', newVisits, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

  const cookieJar = '🍪'.repeat(newVisits);

  res.render('index', {
    visits: newVisits,
    cookieJar
  });
});

router.post('/username', (req, res) => {
  const username = req.body.username || 'Guest';
  res.cookie('username', username, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
  res.redirect('/');
});

module.exports = router;