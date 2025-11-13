import { where } from "sequelize";
import Todo from "../models/Todo.js";
export const list = async (req, res) => {
    try {
        const data = await Todo.findAll({where: {userId:req.user.id}});
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todos', error: error.message });
    }
}
export const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Todo.findOne({ where: { id: id, userId:req.user.id } });
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await data.destroy();
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
}
export const create = async (req, res) => {
    const { title, completed } = req.body;
    try {
        const newToList = {
            title: title,
            completed: completed,
            userId: req.user.id
        };
        const data = await Todo.create(newToList);
        return res.status(201).json({ message: "New item added to to-do list", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
}

export const update = async (req, res) => {
    const { title, completed } = req.body;
    const id = req.params.id;
    try {
        const data = await Todo.findOne({ where: { id: id, userId:req.user.id } });
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
}

export const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Todo.findOne({ where: { id: id, userId:req.user.id } });
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await data.destroy();
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
}