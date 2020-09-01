const router = require("express").Router();
const fetch = require('node-fetch');
const { Post, User } = require('../models');
const withAuth = require("../utils/auth");

router.get('/home', withAuth, (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'content',
        ],
      })
        .then(dbPostData => {
          const posts = dbPostData.map(Post => Post.get({ plain: true }));
    
          res.render('homepage', {
            posts, redditData,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/create', (req, res) => {
  res.render('create-post');
});

router.get('/users/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'first',
      'last'
    ],
  })
    .then(dbUserData => {
      // serialize data before passing to template
      const user = dbUserData.get({ plain: true });
      console.log(user);
      res.render('homepage', {
        user,
        loggedIn: true
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
    res.render('landingpage');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/home');
      return;
    }
  
    res.render('landingpage');
});

let url = 'https://www.reddit.com/.json?limit=5';
let settings = { method: "Get"};
let redditData = ""
fetch(url, settings)
    .then(res => res.json())
    .then(data => {
        redditData = [
    {
    title: data.data.children[0].data.title,
    url: data.data.children[0].data.url_overridden_by_dest
    },
    {
        title: data.data.children[1].data.title,
        url: data.data.children[1].data.url_overridden_by_dest
    },
    {
        title: data.data.children[2].data.title,
        url: data.data.children[2].data.url_overridden_by_dest
    },
    {
        title: data.data.children[3].data.title,
        url: data.data.children[3].data.url_overridden_by_dest
    },
    {
        title: data.data.children[4].data.title,
        url: data.data.children[4].data.url_overridden_by_dest
    }
    ];
});

module.exports = router