const router = require("express").Router();
const { Post, User } = require('../models')

router.get('/home', (req, res) => {
    const data = {posts, redditData};
    res.render('homepage', data);
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/', (req, res) => {
    res.render('landingpage');
});

module.exports = router