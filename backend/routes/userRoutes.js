import express from 'express';
import { addUser, authenticateUser, getAllUsers, getUserByUsername, getUserById, updateUserPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/', addUser);
userRouter.post('/login', authenticateUser);
userRouter.get('/', getAllUsers);
userRouter.get('/userId/:userId', getUserById);
userRouter.get('/:username', getUserByUsername);
userRouter.patch('/:username/password', updateUserPassword);

export default userRouter;
