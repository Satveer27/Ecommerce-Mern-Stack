import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCouponController, deleteCouponsController, getAllCouponsController, getSingleCouponsController, updateCouponsController } from '../controllers/couponController.js';


const couponRouter = express.Router();

couponRouter.post('/createCoupon', isLoggedIn, createCouponController);
couponRouter.get('/allCoupon', isLoggedIn, getAllCouponsController);
couponRouter.get('/:id', isLoggedIn, getSingleCouponsController);
couponRouter.delete('/:id/deleteCoupon', isLoggedIn, deleteCouponsController);
couponRouter.put('/:id/updateCoupon', isLoggedIn, updateCouponsController);

export default couponRouter;