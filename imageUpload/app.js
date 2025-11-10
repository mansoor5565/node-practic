const express = require('express')
const dotenv = require('dotenv')
const upload = require('./config/multerConfig.js');
const validateImage = require('./validators/ImageValidator.js');
const uploadImage = require('./controllers/imageController.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');

dotenv.config();

const app = express();

app.use(express.json())

app.post('/uploads', upload.single('image'), validateImage, uploadImage);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});