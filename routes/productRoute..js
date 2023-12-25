import express from 'express';
import { createProductController, fetchProductController } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';



const productRoutes = express.Router();
productRoutes.post('/createProduct', isLoggedIn,createProductController);
productRoutes.get('/allProducts', fetchProductController);

export default productRoutes;