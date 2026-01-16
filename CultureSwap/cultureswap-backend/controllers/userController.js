import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../middleware/auth.js';

// GET all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude passwords
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET users by ID -- access profile
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // exclude password

        if (!user)
            return res.status(404).json({ message: 'Not Found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create users -- register
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUserEmail = await User.findOne({ email });

        if (existingUserEmail) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Respond with created user (excluding password)
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// POST login users -- authenticate
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).select('+password'); // include password for comparison
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare password
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const accessToken = generateAccessToken(user);

        // Successful login
        res.json({
            message: 'Login successful',
            accessToken: accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// PUT update user -- update profile
export const updateUser = async (req, res) => {
    try {
        const { password, ...safebody } = req.body; // ignore password updates [ for now ]

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            safebody,
            { new: true, runValidators: true }
        ).select('-password'); // exclude password from returned document

        if (!updatedUser) {
            return res.status(404).json({ message: 'Not Found' });
        }

        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

// DELETE user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser)
            return res.status(404).json({ message: 'Not Found' });

        res.json({ message: 'User Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};