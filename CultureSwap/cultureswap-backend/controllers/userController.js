import User from '../models/User.js';

// GET all users
exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET users by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
            return res.status(404).json({ message: 'Not Found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create users
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update user
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser)
            return res.status(404).json({ message: 'Not Found' });

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser)
            res.status(404).json({ message: 'Not Found' });

        res.json({ message: 'User Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};