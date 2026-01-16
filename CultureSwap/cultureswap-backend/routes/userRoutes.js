import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.createUser); // -> Create user / register
userRouter.post('/login', userController.loginUser); // -> Login user

userRouter.get('/', authMiddleware, userController.getUsers); // -> Get all users
userRouter.get('/:id', authMiddleware, userController.getUser); // -> Get user by ID

userRouter.put('/:id', authMiddleware, userController.updateUser); // -> Update user
userRouter.delete('/:id', authMiddleware, userController.deleteUser); // -> Delete user

export default userRouter;