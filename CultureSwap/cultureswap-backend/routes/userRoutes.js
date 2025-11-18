import express from 'express';
import User from '../models/User.js'
import userRouter from express.Router();

users.post('/', async (req, res) => {
    try{
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        req.status(400).json({ error: err.message });
    }
});

export default userRouter;