const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Your existing multer config

// @route   POST /api/posts
// @desc    Create a post (Protected route)
router.post('/', protect, upload.array('images', 5), async (req, res) => {
    try {
        const imageUrls = req.files ? req.files.map(file => file.path) : [];

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id, // Extracted from the JWT middleware!
            images: imageUrls
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;