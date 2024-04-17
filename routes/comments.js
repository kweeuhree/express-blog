const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const comments = require('../data/commentsData');
const { updateSourceFile } = require('typescript');

//get all comments
router.get('/', (req, res) => {
    res.json(comments);
})

//get a single comment
router.get('/:id', (req, res, next) => {
    const comment = comments.find(item => item.id === parseInt(req.params.id));
    if(comment) res.json(comment);
    else next();
})

//post a comment
router.post('/', (req, res) => {
    const newComment = {
        id: uuid.v4(),
        username: req.body.username,
        comment: req.body.comment
    }

    if(!newComment.username || !newComment.comment) {
        return res.status(400).json({ msg: `Make sure to include username and a comment` });
    }

    comments.push(newComment);

    res.json(comments);
})

//update a comment
router.put('/:id', (req, res) => {
    const found = comments.find(item => item.id === parseInt(req.params.id));

    if (found) {
        const updatedComment = req.body;
        comments.forEach(item => {
            if (item.id === parseInt(req.params.id)) {
                item.id = updatedComment.id ? updatedComment.id : item.id;
                item.username = updatedComment.username ? updatedComment.username : item.username;
                item.comment = updatedComment.comment ? updatedComment.comment : item.comment;

                res.json({ msg: `Updated comment`, comment: item });
            }
        });
    } else {
        res.status(400).json({ msg: `Comment not found with id of ${req.params.id}` });
    }
});

//delete a comment
router.delete('/:id', (req, res) => {
    const found = comments.find(item => item.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Comment deleted', comments: comments.filter(item => item.id !== parseInt(req.params.id) )})
    } else {
        res.status(400).json({ msg: `Comment not found with id of ${req.params.id}` })
    }
})



//--------------------------------------export
module.exports = router;