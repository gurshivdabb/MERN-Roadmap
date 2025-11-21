import express from 'express';
import Experience from '../controllers/experienceController.js';

const experienceRouter = express.Router();

experienceRouter.get('/', Experience.getExperiences);
experienceRouter.get('/:id', Experience.getExperience);
experienceRouter.post('/', Experience.createExperience);
experienceRouter.put('/:id', Experience.updateExperience);
experienceRouter.delete('/:id', Experience.deleteExperience);

export default experienceRouter;