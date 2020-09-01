const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// NodeMailer //
require('dotenv').config();
"use strict";
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('process');
const { info } = require('console');
// NodeMailer //

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});