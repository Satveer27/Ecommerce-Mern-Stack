import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { getAllColorController, getSingleColorController, deleteColorController, updateColorController, createColorCtrl } from '../controllers/colorController.js';

const colorRouter = express.Router();

colorRouter.post('/createColor', isLoggedIn, createColorCtrl);
colorRouter.get('/allColor', getAllColorController);
colorRouter.get('/:id', getSingleColorController);
colorRouter.delete('/:id/deleteColor', isLoggedIn, deleteColorController);
colorRouter.put('/:id/updateColor', isLoggedIn, updateColorController);

export default colorRouter;