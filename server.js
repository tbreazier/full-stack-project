// const routes = require('./controllers');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;

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

const photos = [
    {
        content: 'Photo 1',
    },
    {
        content: 'Photo 2',
    },
    {
        content: 'Photo 3',
    },
];

let url = 'https://www.reddit.com/.json?limit=5';

let settings = { method: "Get"};

fetch(url, settings)
    .then(res => res.json())
    .then(data => {
        console.log(data)
});
    // data.children.data.title
    // data.children.data.url_overriden_by_dest
const trendingposts = [
    {
        title: 'Trending 1',
    },
    {
        title: 'Trending 2',
    },
    {
        title: 'Trending 3',
    },
];

app.get('/home', (req, res) => {
    const data = {posts, photos, trendingposts};
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

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
});