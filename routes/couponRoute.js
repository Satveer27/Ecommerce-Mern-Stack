import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCouponController, getAllCouponsController } from '../controllers/couponController.js';


const couponRouter = express.Router();

couponRouter.post('/createCoupon', isLoggedIn, createCouponController);
couponRouter.get('/allCoupon', isLoggedIn, getAllCouponsController);

export default couponRouter;