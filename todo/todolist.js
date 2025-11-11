
import express from 'express';
import { sequelize } from './config/database.js';
import { ErrorHandling } from './middleware/ErrorHandling.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/todo', toDoRoutes);

app.use(ErrorHandling);


sequelize.sync().
    then(() => {
        console.log('Database synced successfully');
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }).catch((err) => {
        console.error('Error syncing database:', err);
    })