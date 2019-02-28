// implement your API here

const express = require('express');

const db = require('./data/db.js')

const server = express();

const port = '9000';

//VERY IMPORTANT DONT FORGET THIS LINE FOR POST EVER!!!!!!!!!!!
server.use(express.json());
//


server.get('/',(req,res) => {
    res.send("Hello World")
})

server.get('/api/users', (req,res) => {
    db.find()
    .then(user => {
        res.json(user);
    })
    .catch((err) => {
        res.status(400).json({err: 'The users information could not be retrieved.'})
    })
})


server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        db.insert(newUser)
        .then( dataBaseUser => {
            res.status(200).json({success: "Created"})
        })
        .catch( err => {
            res.status(500).json({err: "There was an error while saving the user to the database"})
        })
    }else {
        res.status(400).json({err: 'Please provide name and bio for the user'});
    }
});

server.delete('/api/users/:id',(req,res) => {
    const { id } = req.params;

    db.remove(id)
    .then( user => {
        if(user) {
            res.status(200).json({success: "Successfully deleted user"});
        }
        else {
            res.status(400).json({err: "Invalid ID"})
        }
    })
    .catch( err => {
        res.status(500).json({err: "There was an error deleting this user"})
    })
})


server.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
})