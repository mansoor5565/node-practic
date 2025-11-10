const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();

const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No File Uploaded" });
        }
        const filePath = path.join(process.env.UPLOAD_DIR, req.file.filename);

        res.status(500).json({
            message: "File Uploaded Successfully",
            filePath: filePath,
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Error occurred during file upload.',
            error: err.message
        });
    }
}

module.exports = uploadImage