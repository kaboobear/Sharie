const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    followers: {
        type: Number,
        default: 0
    },
    postsCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;