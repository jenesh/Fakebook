const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const db = require('./routes/pgPromise');

const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(`${path.dirname(__dirname)}/public`));
app.use(session({secret: 'session test', resave: false, saveUninitialized: true,}));

app.set('view engine', 'ejs');

// Reroute when the route is just '/'
app.get('/', (req, res) => {
    res.redirect('/login');
})

// Login Page
app.get('/login', (req, res) => {
    const loginPage = path.dirname(__dirname) + '/public/login/login.html';
    res.sendFile(loginPage);
});

// Signup Page
app.get('/sign-up', (req, res) => {
    const signUpPage = path.dirname(__dirname) + '/public/signup/signup.html';
    res.sendFile(signUpPage);
})

app.get('/homepage/:sessionUser', async (req, res) => {
    console.log('Session User: ', req.params.sessionUser);
    const username = req.params.sessionUser;

    let posts = false;
    let id;

    try {
        const data = await db.one(`SELECT * FROM users WHERE username = $1`, [username]);
        id = data.id;
        console.log('Response: ', data);
        if (data.has_posted) {
            posts = true;
        }
    } catch (err) {
        console.log(err);
    }

    try {
        if (posts) {
            const query = "SELECT body FROM posts WHERE user_id = $1";
            const data = await db.any(query, [ id ]);
            console.log(data);
            posts = data;
        }
    } catch (err) {
        console.log(err);
        res.send({
            message: `There seemes to be an error try again`,
            success: false,
            error: err
        })
    }

    const viewPath = path.dirname(__dirname) + '/public/views/profile.ejs';

    res.render(viewPath, {sessionUser: req.params.sessionUser, posts: posts});
    // const loggedIn = path.dirname(__dirname) + '/public/homepage/homepage.html';
    // res.sendFile(loggedIn);
})

// USER ROUTE
const user = require('./routes/userRouter');

app.use('/user', user);

// POST ROUTE
const post = require('./routes/postRouter');

app.use('/post', post);

// LIKE ROUTE
const like = require('./routes/likeRouter');

app.use('/like', like);

const port = 8000;

app.listen(port, () => {
    console.log(`Live at => http://localhost:${port}`);
})