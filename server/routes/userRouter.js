const express = require('express');
const Router = express.Router();
const db = require('./pgPromise');
const path = require('path');
const session = require('express-session');

Router.use(session({secret: 'session test', resave: false, saveUninitialized: true,}));

Router.post('/add', async (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (username, password, has_posted) VALUES ($1, $2, 0)";

    try {
        await db.none(query, [username, password]);
        res.send({
            message: `Added ${username}`,
            success: true
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: `There seemes to be an error try again`,
            success: false,
            error: err
        })
    }
})

Router.get('/all', async (req, res) => {
    const query = "SELECT * FROM users";
    
    try {
        const data = await db.any(query);
        console.log(data.data)
        res.send({
            payload: data,
            message: `Returned all users information`,
            success: true
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: `There seemes to be an error try again`,
            success: false
        })
    }
})

Router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';

    try {
        const data = await db.oneOrNone(query, [username, password]);
        console.log('Authentication', data);
        // if (data.username.length > 0 && data.password.length > 0) {
        if (data !== null) {
            // const loggedIn = path.dirname(__dirname) + '/public/homepage/homepage.html';
            // console.log(loggedIn);

            // req.session.user = {username};
            // res.redirect('/homepage');
            console.log('Session:', username)
            res.send({
                session: username,
                success: true
            })
        } else {
            const loggedIn = path.dirname(__dirname) + '/public/signup/signup.html';
            // res.sendFile(loggedIn);
            res.send({
                success: false
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            success: false
        });
    }
})

Router.get('/username/:username', async (req, res) => {
    // const query = `
    //     SELECT * FROM posts LEFT JOIN users ON (users.id = posts.user_id)
    //     LEFT JOIN likes ON (posts.id = likes.post_id)
    //     WHERE users.username = $1
    // `;

    const query = `SELECT * FROM users WHERE username = $1`;
    
    try {
        const data = await db.one(query, [req.params.username]);
        console.log(data.data);
        res.send({
            payload: data,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: 'There was a error signing up',
            success: false
        });
    }
})

module.exports = Router;