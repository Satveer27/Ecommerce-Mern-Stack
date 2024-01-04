import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl, updateCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController } from '../controllers/categoryController.js';
import upload from '../config/fileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

const categoryRouter = express.Router();
categoryRouter.post('/createCategory', isLoggedIn, isAdmin, upload.single('file'), createCategoryCtrl);
categoryRouter.get('/allCategory', getAllCategoryController);
categoryRouter.get('/:id', getSingleCategoryController);
categoryRouter.delete('/:id/deleteCategory', isLoggedIn, isAdmin, deleteCategoryController);
categoryRouter.put('/:id/updateCategory', isLoggedIn, isAdmin, upload.single('file'), updateCategoryController);
export default categoryRouter;