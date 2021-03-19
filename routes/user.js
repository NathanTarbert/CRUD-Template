const express = require('express');
const router = express.Router();
const User = require('../models/user');

//remember to create a file inside routes to test called route.rest

//get
router.get('/', async(req, res) => {
    try {
        const user = await User.find(); 
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//find one
router.get('/:id', getUser,(req, res) => {// id is found by req.params.id
    res.send(res.user);
});

//create one
router.post('/', async (req, res) => {// id is found by req.params.id
    const user = new User({        
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes
    }); 
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
});

//updating
router.patch('/:id', getUser, async (req, res) => {// id is found by req.params.id
    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    if(req.body.content != null){
        res.user.content = req.body.content;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});

//deleting
router.delete('/:id', getUser, async(req, res) => {// id is found by req.params.id
    try {
        await res.user.remove();
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next){
    let user; 
    try {
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;