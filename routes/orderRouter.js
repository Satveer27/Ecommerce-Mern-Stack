import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createOrderController, getAllOrderController, getSingleOrderController } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder', isLoggedIn, createOrderController);
orderRouter.get('/allOrder', isLoggedIn, getAllOrderController);
orderRouter.get('/:id', isLoggedIn, getSingleOrderController);

export default orderRouter;