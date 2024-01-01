import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl } from '../controllers/categoryController.js';

const categoryRouter = express.Router();
categoryRouter.post('/create', isLoggedIn, createCategoryCtrl);
export default categoryRouter;