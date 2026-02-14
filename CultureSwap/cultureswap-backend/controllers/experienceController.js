/**
 * experienceController.js
 * Handles CRUD operations for Experience entities.
 * 
 * Author: Gurshiv Singh Dabb
 */

import Experience from "../models/Experience.js";
import { HTTP_STATUS } from "../config/constants.js";

// GET all experiences
export const getExperiences = async (req, res) => {
    try {
        const exps = await Experience.find().populate('userID');
        
        if (exps.length === 0) {
            return res.status(HTTP_STATUS.NO_CONTENT).json({ message: 'No experiences found' });
        }

        res.json(exps);
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

// GET experience by ID
export const getExperience = async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.id).populate('userID');

        if (!exp) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found' });
        }

        res.json(exp);
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

// POST new experience
export const createExperience = async (req, res) => {
    try {
        const exp = await Experience.create({ ...req.body, userID: req.user._id });
        res.status(HTTP_STATUS.CREATED).json({
            message: 'Experience created',
            experience: exp
        });
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
};

// Update experience
export const updateExperience = async (req, res) => {
    try {
        // Check existence
        const exp = await Experience.findById(req.params.id);
        if (!exp)
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Experience Not Found' });

        // Check ownership
        if (exp.userID.toString() !== req.user._id.toString()) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden: Not your experience' });
        }

        const updatedExp = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedExp) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found' });
        }
        
        res.json(updatedExp);
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
};

// DELETE experience
export const deleteExperience = async (req, res) => {
    try {
        // Check existence
        const exp = await Experience.findById(req.params.id);
        if (!exp)
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Experience Not Found' });

        // Check ownership
        if (exp.userID.toString() !== req.user._id.toString()) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden: Not your experience' });
        }

        const deletedExp = await Experience.findByIdAndDelete(req.params.id);

        if (!deletedExp) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found' });
        }
        res.json({ message: 'Experience Deleted Successfully' });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

