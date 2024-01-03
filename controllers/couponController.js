import asyncHandler from 'express-async-handler';
import Coupon from '../model/Coupon.js';

//@description  Create new Coupon
//@route        POST /api/v1/coupon/createCoupon
//@access       Private/Admin

export const createCouponController = asyncHandler(async(req,res)=>{
    const {code, startDate, endDate, discount} = req.body;

    const couponExist = await Coupon.findOne({
        code
    })

    if(couponExist){
        throw new Error("Coupon already exist");
    }

    if(isNaN(discount)){
        throw new Error("Discount value must be a number")
    }

    const createCoupon = await Coupon.create({
        code,
        startDate,
        endDate,
        discount,
        user: req.userAuthId
    });

    res.json({
        status:"success",
        message:"created coupon",
        createCoupon
    })
})

//@description  get all Coupon
//@route        GET /api/v1/coupon/allCoupon
//@access       Private/Admin

export const getAllCouponsController = asyncHandler(async(req,res)=>{ 
    const coupons = await Coupon.find();
    res.json({
        status:"success",
        message:"all coupons",
        coupons,
    })
})