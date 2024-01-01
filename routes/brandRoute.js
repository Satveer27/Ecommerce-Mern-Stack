import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createBrandCtrl, getAllBrandController, getSingleBrandController, updateBrandController, deleteBrandController } from '../controllers/brandController.js';

const brandRoute = express.Router();

brandRoute.post('/createBrand', isLoggedIn, createBrandCtrl);
brandRoute.get('/allBrand', getAllBrandController);
brandRoute.get('/:id', getSingleBrandController);
brandRoute.delete('/:id/deleteBrand', isLoggedIn, deleteBrandController);
brandRoute.put('/:id/updateBrand', isLoggedIn, updateBrandController);

export default brandRoute;
