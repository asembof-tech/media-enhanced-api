const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Post = require('../models/Post');

// Upload up to 5 images per post
router.post('/', upload.array('images', 5), async (req, res, next) => {
    try {
        // req.files contains the array of uploaded files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least 1 image' });
        }

        const imageUrls = req.files.map(file => file.path);

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.authorId, // Assuming you pass the user ID
            images: imageUrls
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        next(error);
    }
});

module.exports = router;