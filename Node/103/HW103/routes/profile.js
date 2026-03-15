const express = require('express');
const router = express.Router();

router.get('/', function (req, res,) {

    res.render('layout', {
        title: 'Enter Username',
        partials: {
            content: 'profile'
        }
    });

});

router.post('/', function (req, res) {

    res.cookie('username', req.body.username, { maxAge: 86400000 });

    res.redirect('/');
});

module.exports = router;