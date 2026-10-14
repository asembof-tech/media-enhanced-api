const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const User = require('../models/User');

// Upload single avatar
router.post('/register', upload.single('avatar'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an avatar' });
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            avatar: req.file.path // Cloudinary URL
        });

        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error);
    }
});

module.exports = router;