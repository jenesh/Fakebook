const express = require('express');
const Router = express.Router();
const db = require('./pgPromise');

Router.post('/add', async (req, res) => {
    const { user_id, post_id } = req.body;
    const query = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)";

    try {
        const data = await db.none(query, [user_id, post_id]);
        console.log(data);
        res.send({
            message: `Added a like from ${user_id} to ${post_id}`,
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
});

Router.get('/all', async (req, res) => {
    const query = "SELECT * FROM likes";

    try {
        const data = await db.any(query);
        console.log(data)
        res.send({
            payload: data,
            message: `Returned all like information`,
            success: true
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: `There seemes to be an error try again`,
            success: false
        })
    }
});

// Filter by number of likes

module.exports = Router;