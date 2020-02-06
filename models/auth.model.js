const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
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
    }
}, {timestamps: true});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;