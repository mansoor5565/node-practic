const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();

fs.ensureDirSync(process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, process.env.UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedType = process.env.ALLOWED_IMAGE_TYPES.split(',');

    if (allowedType.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid File Type'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: process.env.MAX_IMAGE_SIZE },
    fileFilter: fileFilter
})
module.exports = upload;