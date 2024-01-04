import express from 'express';
import { createProductController, fetchProductController, getSingleProductController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';

const productRoutes = express.Router();
productRoutes.post('/createProduct', isLoggedIn, upload.array('files'), createProductController);
productRoutes.get('/allProducts', fetchProductController);
productRoutes.get('/:id' ,getSingleProductController);
productRoutes.put('/:id/update', isLoggedIn, updateProductController);
productRoutes.delete('/:id/delete', isLoggedIn, deleteProductController);

export default productRoutes;