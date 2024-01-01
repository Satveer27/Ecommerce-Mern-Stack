import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createOrderController } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder', isLoggedIn, createOrderController);

export default orderRouter;