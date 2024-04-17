const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const posts = require('../data/postsData');

//get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// get a single post
router.get('/:id', (req, res, next) => {
    const post = posts.find(item => item.id === parseInt(req.params.id));

    if(post) res.json(post);
    else(next);
});

// post a post
router.post('/', (req, res) => {
    const newPost = {
        id: uuid.v4(),
        username: req.body.username,
        blogEntry: req.body.blogEntry
    }

    if(!newPost.username || !newPost.blogEntry) {
        return res.status(400).json({ msg: `Please include username a blog entry` })
    }

    posts.push(newPost);

    res.json(posts);
})

//update a post
router.put('/:id', (req, res) => {
    const found = posts.find(item => item.id === parseInt(req.params.id));

    if(found) {
        const updatedPost = req.body;
        posts.forEach(item => {
            if(item.id === parseInt(req.params.id)) {
                item.id = updatedPost.id ? updatedPost.id : item.id;
                item.username = updatedPost.username ? updatedPost.username : item.username;
                item.blogEntry = updatedPost.blogEntry ? updatedPost.blogEntry : item.blogEntry;

                res.json({ msg:'Updated post', item });
            }
        })
    } else {
        res.status(400).json({ msg: `Post not found with id of ${req.params.id}` });
    }
})

//delete a post
router.delete('/:id', (req, res) => {
    const found = posts.find(item => item.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: `Post deleted with id of ${req.params.id}`  , posts: posts.filter(item => item.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `Post not found with id of ${req.params.id}` })
    }
})




//--------------------------------------export
module.exports = router;