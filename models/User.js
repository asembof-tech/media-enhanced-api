const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { 
        type: String, // Cloudinary URL
        required: true 
    } // Single string enforces 1 avatar
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);