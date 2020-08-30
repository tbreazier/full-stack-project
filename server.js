// const routes = require('./controllers');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');

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

const trendingposts = [
    {
        trending_title: 'Trending 1',
    },
    {
        trending_title: 'Trending 2',
    },
    {
        trending_title: 'Trending 3',
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