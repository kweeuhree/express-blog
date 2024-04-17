const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const users = require('../data/usersData');


//get all users
router.get('/', (req, res) => {
    res.json(users);
})

//get a single user
router.get('/:id', (req, res, next) => {
    const user = users.find(item => item.id === parseInt(req.params.id));

    if(user) res.json(user);
    else next();
})

//post a new user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        username: req.body.username,
        favoriteProgrammingLanguage: req.body.favoriteProgrammingLanguage,
        countryOfOrigin: req.body.countryOfOrigin
    }

    for(let key of Object.keys(newUser)) {
        if(!newUser[key]) {
            return res.status(400).json({ msg: `Please include username, favourite programming language and a country of origin`})
        }

    users.push(newUser);

    res.json(users);
    }
})

// update a user
router.put('/:id', (req, res) => {
    const found = users.find(item => item.id === parseInt(req.params.id));

    if(found) {
        const updatedUser = req.body;
        users.forEach(item => {
            if(item.id === parseInt(req.params.id)) {
                item.id = updatedUser.id ? updatedUser.id : item.id;
                item.username = updatedUser.username ? updatedUser.username : item.username;
                item.favoriteProgrammingLanguage = updatedUser.favoriteProgrammingLanguage ? updatedUser.favoriteProgrammingLanguage : item.favoriteProgrammingLanguage;
                item.countryOfOrigin = updatedUser.countryOfOrigin ? updatedUser.countryOfOrigin : item.countryOfOrigin;

                res.json({ msg: 'Updated user', user: item });
            }
        });
    } else {
        res.status(400).json({ msg: `User not found with id of ${req.params.id}` })
    }
})

//delete a user
router.delete('/:id', (req, res) => {
    const found = users.find(item => item.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: `Deleted a user with id of ${req.params.id}`, users: users.filter(item => item.id !== parseInt(req.params.id)) })
    } else {
        res.status(400).json({ msg: `User not found with id of ${req.params.id}` })
    }
})

//--------------------------------------export
module.exports = router;