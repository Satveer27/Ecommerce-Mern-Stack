import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl, updateCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController } from '../controllers/categoryController.js';
import upload from '../config/fileUpload.js';

const categoryRouter = express.Router();
categoryRouter.post('/createCategory', isLoggedIn, upload.single('file'), createCategoryCtrl);
categoryRouter.get('/allCategory', getAllCategoryController);
categoryRouter.get('/:id', getSingleCategoryController);
categoryRouter.delete('/:id/deleteCategory', isLoggedIn, deleteCategoryController);
categoryRouter.put('/:id/updateCategory', isLoggedIn, updateCategoryController);
export default categoryRouter;