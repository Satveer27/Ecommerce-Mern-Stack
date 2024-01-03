import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCouponController } from '../controllers/couponController.js';


const couponRouter = express.Router();

couponRouter.post('/createCoupon', isLoggedIn, createCouponController);

export default couponRouter;