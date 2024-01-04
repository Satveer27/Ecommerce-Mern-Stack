import express from 'express';
import { createProductController, fetchProductController, getSingleProductController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

const productRoutes = express.Router();
productRoutes.post('/createProduct', isLoggedIn, isAdmin, upload.array('files'), createProductController);
productRoutes.get('/allProducts', fetchProductController);
productRoutes.get('/:id' ,getSingleProductController);
productRoutes.put('/:id/update', isLoggedIn, isAdmin, upload.array('files'), updateProductController);
productRoutes.delete('/:id/delete', isLoggedIn, isAdmin, deleteProductController);

export default productRoutes;