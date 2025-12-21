import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers); // -> Get all users
userRouter.get('/:id', userController.getUser); // -> Get user by ID

userRouter.post('/signup', userController.createUser); // -> Create user / register
userRouter.post('/login', userController.loginUser); // -> Login user

userRouter.put('/:id', userController.updateUser); // -> Update user
userRouter.delete('/:id', userController.deleteUser); // -> Delete user

export default userRouter;