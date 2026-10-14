const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'media_api', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

// Enforce 3MB limit (3 * 1024 * 1024 bytes)
const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }, 
});

module.exports = upload;