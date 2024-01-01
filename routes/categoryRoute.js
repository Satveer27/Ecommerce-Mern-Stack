import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl, updateCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController } from '../controllers/categoryController.js';

const categoryRouter = express.Router();
categoryRouter.post('/createCategory', isLoggedIn, createCategoryCtrl);
categoryRouter.get('/allCategory', getAllCategoryController);
categoryRouter.get('/:id', getSingleCategoryController);
categoryRouter.delete('/:id/deleteCategory', deleteCategoryController);
categoryRouter.put('/:id/updateCategory', updateCategoryController);
export default categoryRouter;