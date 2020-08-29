// const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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
    const data = {posts};
    res.render('homepage', data);
});

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
});