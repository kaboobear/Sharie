const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

let Auth = require('../models/auth.model');

router
    .route('/')
    .get((req, res) => {
        Auth
            .find()
            .limit(50)
            .then(auth => res.json(auth))
    })

router
    .route('/:id')
    .get((req, res) => {
        Auth
            .findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err))
    })

router
    .route('/friends')
    .post((req, res) => {
        Auth
            .find({'_id':{$in:req.body}},function(err,docs){
                console.log(docs);
                res.json(docs)
            })

    })

router
    .route('/update/:id')
    .post((req, res) => {

        Auth
            .findById(req.params.id)
            .then(auth => {

                auth.login = req.body.login;
                auth.mail = req.body.mail;
                auth.pass = req.body.pass;
                auth.followers = req.body.followers;
                auth.postsCount = req.body.postsCount;
                auth.friendsArray = req.body.friendsArray;

                if (!req.body.notAuth) {
                    const payload = {
                        id: req.body.id,
                        login: req.body.login,
                        mail: req.body.mail,
                        pass: req.body.pass,
                        followers: req.body.followers,
                        postsCount: req.body.postsCount,
                        friendsArray: req.body.friendsArray
                    };

                    jwt.sign(payload, '123123nko', {
                        expiresIn: 31556926
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                }

                auth
                    .save()
                    .then(() => {})
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })

router.post("/register", (req, res) => {
    const {errors, isValid} = validateRegister(req.body);

    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    }
    Auth
        .findOne({mail: req.body.mail})
        .then(auth => {
            if (auth) {
                return res
                    .status(400)
                    .json({mail: "Email already exists"});
            } else {
                const newAuth = new Auth({login: req.body.login, mail: req.body.mail, pass: req.body.pass});

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAuth.pass, salt, (err, hash) => {
                        if (err) 
                            throw err;
                        newAuth.pass = hash;
                        newAuth
                            .save()
                            .then(auth => res.json(auth))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

router.post("/login", (req, res) => {
    const {errors, isValid} = validateLogin(req.body);

    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    }

    const mail = req.body.mail;
    const pass = req.body.pass;

    Auth
        .findOne({mail})
        .then(auth => {
            if (!auth) {
                return res
                    .status(404)
                    .json({mail: "Email not found"});
            }

            bcrypt
                .compare(pass, auth.pass)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: auth.id,
                            login: auth.login,
                            mail: auth.mail,
                            pass: auth.pass,
                            followers: auth.followers,
                            postsCount: auth.postsCount,
                            friendsArray: auth.friendsArray
                        };

                        jwt.sign(payload, '123123nko', {
                            expiresIn: 31556926
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res
                            .status(400)
                            .json({pass: "Password incorrect"});
                    }
                });
        });
});

module.exports = router;