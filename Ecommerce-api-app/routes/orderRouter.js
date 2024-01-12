import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createOrderController, getAllOrderController, getOrderStatisticController, getSingleOrderController, updateOrderController } from '../controllers/orderController.js';
import isAdmin from '../middlewares/isAdmin.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder', isLoggedIn, createOrderController);
orderRouter.get('/allOrder', isLoggedIn, isAdmin, getAllOrderController);
orderRouter.get('/:id', isLoggedIn, isAdmin, getSingleOrderController);
orderRouter.get('/sales/sum', isLoggedIn, isAdmin, getOrderStatisticController);
orderRouter.put('/update/:id', isLoggedIn, isAdmin, updateOrderController);

export default orderRouter;