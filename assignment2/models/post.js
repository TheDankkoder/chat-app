const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;