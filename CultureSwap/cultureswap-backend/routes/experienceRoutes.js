import express from 'express';
import * as expController from '../controllers/experienceController.js';

const experienceRouter = express.Router();

experienceRouter.get('/', expController.getExperiences);
experienceRouter.get('/:id', expController.getExperience);
experienceRouter.post('/', expController.createExperience);
experienceRouter.put('/:id', expController.updateExperience);
experienceRouter.delete('/:id', expController.deleteExperience);

export default experienceRouter;