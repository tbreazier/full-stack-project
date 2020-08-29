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

app.get('/', (req, res) => {
    res.render('landingpage');
});

app.get('/home', (req, res) => {
    res.render('homepage', posts);
});

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});