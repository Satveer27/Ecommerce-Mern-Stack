import express from 'express';
import { createProductController, fetchProductController, getSingleProductController, updateProductController } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';



const productRoutes = express.Router();
productRoutes.post('/createProduct', isLoggedIn,createProductController);
productRoutes.get('/allProducts', fetchProductController);
productRoutes.get('/:id' ,getSingleProductController);
productRoutes.put('/:id', isLoggedIn, updateProductController);

export default productRoutes;