const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));
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

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});