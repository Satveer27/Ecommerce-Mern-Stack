import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createBrandCtrl, getAllBrandController, getSingleBrandController, updateBrandController, deleteBrandController } from '../controllers/brandController.js';
import isAdmin from '../middlewares/isAdmin.js';
import upload from '../config/fileUpload.js';

const brandRoute = express.Router();

brandRoute.post('/createBrand', isLoggedIn, isAdmin, upload.single('file'),createBrandCtrl);
brandRoute.get('/allBrand', getAllBrandController);
brandRoute.get('/:id', getSingleBrandController);
brandRoute.delete('/:id/deleteBrand', isLoggedIn, isAdmin, deleteBrandController);
brandRoute.put('/:id/updateBrand', isLoggedIn, isAdmin, updateBrandController);

export default brandRoute;
