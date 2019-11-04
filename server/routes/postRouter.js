const express = require('express');
const Router = express.Router();
const db = require('./pgPromise');

Router.get('/all', async (req, res) => {
    const query = "SELECT * FROM posts";
    
    try {
        const data = await db.any(query);
        console.log(data);
        res.send({
            payload: data,
            message: `Returned all posts`,
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

Router.get('/:user_id', async (req, res) => {
    const user_id = Number(req.params.user_id);
    console.log(user_id);
    const query = "SELECT * FROM posts WHERE user_id = $1";
    
    try {
        const data = await db.one(query, [ user_id ]);
        console.log(data);
        res.send({
            message: `Returned post for user: ${user_id}`,
            success: true,
            payload: data
        })
    } catch (err) {
        console.log(err);
        res.send({
            message: `There seemes to be an error try again`,
            success: false,
            error: err
        })
    }
})

Router.post('/register', async (req, res) => {
    const { user_id, body } = req.body;
    const query = `
    INSERT INTO posts (user_id, body) VALUES ($1, $2); 
    UPDATE users SET all_posts = array_append(all_posts, 1) WHERE id = $1
    `;
    
    try {
        const data = await db.none(query, [user_id, body]);
        console.log(data);
        res.send({
            message: `Added post: ${body} by user: ${user_id}`,
            success: true
        })
    } catch (err) {
        console.log(err);
        res.send({
            message: `There seemes to be an error try again`,
            success: false,
            error: err
        })
    }
})

module.exports = Router;