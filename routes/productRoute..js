import express from 'express';
import { createProductController } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';



const productRoutes = express.Router();
productRoutes.post('/', isLoggedIn,createProductController);


export default productRoutes;