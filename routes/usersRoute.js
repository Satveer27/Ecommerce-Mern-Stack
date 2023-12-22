import express from 'express';
import { getUserProfileController, loginUserController, registerUserController } from '../controllers/usersController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const userRoutes = express.Router();

userRoutes.post('/register', registerUserController);
userRoutes.post('/login', loginUserController);
userRoutes.get('/profile', isLoggedIn , getUserProfileController);

export default userRoutes;