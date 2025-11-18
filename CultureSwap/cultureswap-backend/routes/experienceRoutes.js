import express from 'express';
import Experience from '../models/Experience.js'
import experienceRouter from express.Router();

Experience.post('/', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        const savedExperience = await experience.save();
        res.json(savedExperience);
    } catch (err) {
        req.status(400).json({ error: err.message }); 
    }
});

export default experienceRouter;