import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if(!isCorrectPassword) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name:user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
}

export const register = async (req, res) => {
    const { name,email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if(existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name,email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
}