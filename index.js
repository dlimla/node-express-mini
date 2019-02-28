// implement your API here

const express = require('express');

const server = express();

const port = '9000';

const db = require('./data/db.js')

server.get('/',(req,res) => {
    res.send("Hello World")
})

server.get('/api/users', (req,res) => {
    db.find()
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
    })
})


server.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
})