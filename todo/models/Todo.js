import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './user.js';

const Todo = sequelize.define('Todo', {
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
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    }
},
    {
        timestamp: true,
    }
);

Todo.belongsTo(User, { foreignKey: 'userId' });

export default Todo;