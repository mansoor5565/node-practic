const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();
const validateImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded. Please provide an image file.'
        });
    }
    const schema = Joi.object({
        size: Joi.number().max(parseInt(process.env.MAX_IMAGE_SIZE)).required(),  // Max file size
        mimetype: Joi.string().valid(...process.env.ALLOWED_IMAGE_TYPES.split(',')).required(),
    });

    const file = { size: req?.file?.size, mimetype: req?.file?.mimetype };
    const { error } = schema.validate(file);

    if (error) {
        // Ensure error.details is defined and not empty
        const message = error.details && error.details[0] && error.details[0].message
            ? error.details[0].message
            : 'File validation failed';

        return res.status(400).json({
            message: `File validation failed: ${message}`,
        });
    }

    next();
}

module.exports = validateImage