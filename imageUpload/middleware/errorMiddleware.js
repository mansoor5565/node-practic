
const multer = require('multer')
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    }
    if (err.message) {
        return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: 'Server Error', error: err.message });
}

module.exports = errorMiddleware