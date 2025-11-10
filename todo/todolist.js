
import express from 'express';
import { sequelize } from './config/database.js';
import { Todo } from './models/Todo.js';
import { ErrorHandling } from './middleware/ErrorHandling.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const data = await Todo.findAll();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todos', error: error.message });
    }
});

// Get a todo by ID
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Todo.findByPk(id);
        if (data) {
            return res.status(200).json({ data });
        }
        return res.status(404).json({ message: 'Todo not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todo', error: error.message });
    }
});

// Create a new todo
app.post('/todos', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const newToList = {
            title: title,
            completed: completed,
        };
        const data = await Todo.create(newToList);
        return res.status(201).json({ message: "New item added to to-do list", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
    const { title, completed } = req.body;
    const id = req.params.id;
    try {
        const data = await Todo.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const updatedTodo = {
            title,
            completed
        };

        await data.update(updatedTodo);
        return res.status(200).json({ message: 'Updated successfully', data: updatedTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update todo', error: error.message });
    }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Todo.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await data.destroy();
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
});

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