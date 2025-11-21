import express from 'express';
import { getExperiences, getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';

const experienceRouter = express.Router();

experienceRouter.get('/', getExperiences);
experienceRouter.get('/:id', getExperience);
experienceRouter.post('/', createExperience);
experienceRouter.put('/:id', updateExperience);
experienceRouter.delete('/:id', deleteExperience);

export default experienceRouter;