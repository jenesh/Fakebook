const express = require('express');
const Router = express.Router();
const db = require('./pgPromise');

Router.post('/add', async (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    
    try {
        const data = await db.none(query, [username, password]);
        console.log(data)
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
        console.log(data)
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


module.exports = Router;