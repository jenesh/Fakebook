const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(`${path.dirname(__dirname)}/public`));

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