import Experience from "../models/Experience.js";

// GET all experiences
export const getExperiences = async (req, res) => {
    try {
        const exps = await Experience.find().populate('userID');
        res.json(exps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET experience by ID
export const getExperience = async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.id).populate('userID');

        if (!exp)
            res.status(404).json({ message: 'Not Found' });

        res.json(exp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new experience
export const createExperience = async (req, res) => {
    try {
        const exp = await Experience.create(req.body);
        res.status(201).json(exp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update experience
export const updateExperience = async (req, res) => {
    try {
        const updatedExp = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedExp)
            return res.status(404).json({ message: 'Not Found' });

        res.json(updatedExp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE experience
export const deleteExperience = async (req, res) => {
    try {
        const deletedExp = await Experience.findByIdAndDelete(req.params.id);

        if (!deletedExp)
            return res.status(404).json({ message: 'Not Found' });

        res.json({ message: 'Experience Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

