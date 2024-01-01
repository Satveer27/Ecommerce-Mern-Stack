import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';

//@desc   create orders
//@route  POST /api/v1/order/createOrder
//@access private

export const createOrderController = asyncHandler(async(req,res)=>{ 
    res.json({
        msg:"order Controller"
    });
});