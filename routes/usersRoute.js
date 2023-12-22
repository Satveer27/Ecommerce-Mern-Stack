import express from 'express';
import { loginUserController, registerUserController } from '../controllers/usersController.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerUserController);
userRoutes.post('/api/v1/users/login', loginUserController);

export default userRoutes;