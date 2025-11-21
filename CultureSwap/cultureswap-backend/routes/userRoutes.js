import express from 'express';
import User from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', User.getUsers);
userRouter.get('/:id', User.getUser);
userRouter.post('/', User.createUser);
userRouter.put('/:id', User.updateUser);
userRouter.delete('/:id', User.deleteUser);

export default userRouter;