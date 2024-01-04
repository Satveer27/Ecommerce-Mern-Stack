import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { getAllColorController, getSingleColorController, deleteColorController, updateColorController, createColorCtrl } from '../controllers/colorController.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorRouter = express.Router();

colorRouter.post('/createColor', isLoggedIn, isAdmin, createColorCtrl);
colorRouter.get('/allColor', getAllColorController);
colorRouter.get('/:id', getSingleColorController);
colorRouter.delete('/:id/deleteColor', isLoggedIn, isAdmin,  deleteColorController);
colorRouter.put('/:id/updateColor', isLoggedIn, isAdmin, updateColorController);

export default colorRouter;