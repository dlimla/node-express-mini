// implement your API here

const express = require('express');

const db = require('./data/db.js')

const server = express();

const port = '9000';

server.use(express.json());

server.get('/',(req,res) => {
    res.send("Hello World")
})

server.get('/api/users', (req,res) => {
    db.find()
    .then(user => {
        res.json(user);
    })
    .catch((err) => {
        res.status(400).json({err: '/get failed'})
    })
})


server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        db.insert(newUser)
        .then( dataBaseUser => {
            res.status(200).json(dataBaseUser)
        })
        .catch((err) => {
            res.status(400).json({err: '/get failed'})
        })
    }else {
        res.status(400).statusMessage({err: 'bad data'});
    }
});

server.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
})