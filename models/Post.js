const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [{ 
        type: String // Array of Cloudinary URLs
    }] 
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);