const router = require('express').Router();
let Post = require('../models/post.model');

router
    .route('/')
    .get((req, res) => {
        Post
            .find()
            .then(posts => res.json(posts))
    })

router
    .route('/add')
    .post((req, res) => {
        const username = req.body.username;
        const newPost = new Post({username});

        newPost
            .save()
            .then(posts => res.json(newPost))
            .catch(err => res.status(400).json('Error: ' + err))
    })

router
    .route('/:id')
    .get((req, res) => {
        Post
            .findById(req.params.id)
            .then(posts => res.json(posts))
            .catch(err => res.status(400).json('Error: ' + err))
    })

router
    .route('/:id')
    .delete((req, res) => {
        Post
            .findByIdAndDelete(req.params.id)
            .then(posts => res.json('Post deleted'))
            .catch(err => res.status(400).json('Error: ' + err))
    })

router
    .route('/update/:id')
    .post((req, res) => {
        Post
            .findById(req.params.id)
            .then(post => {
                post.username = req.body.username;

                post
                    .save()
                    .then(() => res.json('Post updated'))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })

module.exports = router;