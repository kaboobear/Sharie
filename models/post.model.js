const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    authorId: {
        type: String,
        required: true,
        trim: true,
    },
    author:{ 
        type: Schema.Types.ObjectId,
        ref: 'Auth' 
    },
    likesArray:{ 
        type: [String],
    },
    postText: {
        type: String,
        required: true,
        trim: true,
    },
    postShared: {
        type: Number,
        required: true,
        trim: true, 
    },
    postLikes: {
        type: Number,
        required: true,
        trim: true,
    },
    postShares: {
        type: Number,
        required: true,
        trim: true,
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;