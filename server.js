// const routes = require('./controllers');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;
// NodeMailer //
require('dotenv').config();
"use strict";
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('process');
const { info } = require('console');
// NodeMailer //

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

const posts = [
    {
        title: 'Test 1',
        post_text: 'This is a test'
    },
    {
        title: 'Test 2',
        post_text: 'This is another test'
    },
    {
        title: 'Test 3',
        post_text: 'This is the final test test'
    },
];

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

app.get('/home', (req, res) => {
    const data = {posts, redditData};
    res.render('homepage', data);
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('landingpage');
});

app.get('/create', (req, res) => {
    res.render('create-post');
});

app.post('/send', function(req, res, next) {
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
      text: 'Your friend just invited you to join Simple Social!'
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

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
});
