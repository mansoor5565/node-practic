
import express from 'express';
import { sequelize } from './config/database.js';
import { ErrorHandling } from './middleware/ErrorHandling.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import toDoRoutes from './routes/toDoRoutes.js';
import User from './models/User.js';
import Todo from './models/Todo.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
app.use('/todo', toDoRoutes);

app.use(ErrorHandling);
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});

User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true }).
    then(() => {
        console.log('Database synced successfully');
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }).catch((err) => {
        console.error('Error syncing database:', err);
    })