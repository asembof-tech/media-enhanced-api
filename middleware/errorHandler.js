const multer = require('multer');
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Multer specific errors
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Max size is 3MB.' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Too many files. Max 5 images allowed.' });
        }
    }

    res.status(500).json({ message: err.message || 'Server Error' });
};

module.exports = errorHandler;