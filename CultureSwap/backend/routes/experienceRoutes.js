/**
 * experienceRoutes.js
 * Routes for Experience entity
 * 
 * Author: Gurshiv Singh Dabb
 */

import express from 'express';
import * as expController from '../controllers/experienceController.js';
import { authMiddleware } from '../middleware/auth.js';

const experienceRouter = express.Router();

experienceRouter.get('/', expController.getExperiences);
experienceRouter.get('/:id', expController.getExperience);

experienceRouter.post('/', authMiddleware, expController.createExperience);
experienceRouter.put('/:id', authMiddleware, expController.updateExperience);
experienceRouter.delete('/:id', authMiddleware, expController.deleteExperience);

export default experienceRouter;