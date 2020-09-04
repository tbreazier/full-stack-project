const router = require("express").Router();
const fetch = require('node-fetch');
const { Post, User } = require('../models');
const withAuth = require("../utils/auth");
require('dotenv').config();
"use strict";
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');
const { info } = require('console');

router.get('/home', withAuth, (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'content',
        ],
      })
        .then(dbPostData => {
          const posts = dbPostData.map(Post => Post.get({ plain: true }));
    
          // res.render('homepage', {
          //   posts, redditData,
          // });
          return posts
        })
        .then(posts => {
          console.log("session info:" + req.session);
          User.findOne({
            where: {id:req.session.user_id},
            attributes: [
              'first',
              'last',
              'email',
            ],
          })
        .then(userData => {
          console.log(userData.get({ plain: true }));
          res.render('homepage', {
            posts, redditData, user: userData.get({ plain: true })
          });
          return userData.get({ plain: true });
        })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

router.get('/viewposts', withAuth, (req, res) => {
  Post.findAll({
      attributes: [
        'id',
        'content',
      ],
    })
      .then(dbPostData => {
        const posts = dbPostData.map(Post => Post.get({ plain: true }));
  
        res.render('viewposts', {
          posts, redditData,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/viewtrending', withAuth, (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'content',
        ],
      })
        .then(dbPostData => {
          const posts = dbPostData.map(Post => Post.get({ plain: true }));
    
          res.render('viewtrending', {
            posts, redditData,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

router.get('/editpost/:id', withAuth, (req, res) => {
  Post.findOne({
      attributes: [
        'id',
        'content',
      ],
      raw: true,
      where: {
        id: req.params.id
    },
    })
      .then(dbPostData => {
        // const posts = dbPostData.map(Post => Post.get({ plain: true }));
        // res.json(dbPostData);
        console.log(dbPostData);
        // console.log(dbPostData.dataValues.content);
        res.render('editpost', dbPostData);
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

router.get('/viewposts', (req, res) => {
  res.render('viewposts');
});

router.get('/viewtrending', (req, res) => {
  res.render('viewtrending');
});

router.get('/editpost', (req, res) => {
  res.render('editpost');
});

router.get('/editpost/:id', (req, res) => {
  res.render('editpost');
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

router.post('/send', function(req, res, next,) {
  console.log(req.email);
  console.log("req.body" + req.body);
  // console.log(req.body);
  // console.log("Session:" + console.log(req.sessionID);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_address,
      pass: process.env.email_password
    }
  })
  const mailOptions = {
    from: 'simple.social.fullstack@gmail.com',
    to: 'simple.social.fullstack@gmail.com',
    subject: 'Invitation to Join Simple Social!',
    text: 'Your friend just invited you to join Simple Social! Follow this link to join: https://simple-social-fullstack.herokuapp.com/',
    attachments: [
      { filename: 'login.jpg', path: './public/images/login.jpg' }
    ]
  //   replyTo: `${req.body.email}`
  }

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    };
    console.log('Message sent: ' + mailOptions.subject);
    res.sendStatus(200);
  });
  return res.end();
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