import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

export const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        timestamp: true,
    }
);