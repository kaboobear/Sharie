const router = require('express').Router();
let Post = require('../models/post.model');

router
    .route('/')
    .get((req, res) => {

        Post
            .find()
            .sort('-createdAt')
            .populate('author')
            .then(posts => res.json(posts))
    })

router
    .route('/add')
    .post((req, res) => {
        const authorId = req.body.authorId;
        const postText = req.body.postText;
        const postShared = req.body.postShared;
        const postLikes = req.body.postLikes;
        const postShares = req.body.postShares;
        const author = req.body.authorId;

        const newPost = new Post({
            authorId,
            author,
            postText,
            postShared,
            postLikes,
            postShares
        });

        newPost
            .save()
            .then(posts => res.json(posts))
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
            .catch(err => res.status(400).json(' Error : ' + err))
    })

router
    .route('/update/:id')
    .post((req, res) => {
        Post
            .findById(req.params.id)
            .then(post => {
                post.authorId = req.body.authorId;
                post.postText = req.body.postText;
                post.postShared = req.body.postShared;
                post.postLikes = req.body.postLikes;
                post.postShares = req.body.postShares;
                post.author = req.body.authorId;
                post.likesArray = req.body.likesArray;

                post
                    .save()
                    .then(() => res.json('Post updated'))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })


module.exports = router;