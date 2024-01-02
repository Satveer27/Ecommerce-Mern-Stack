import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';
import User from "../model/User.js";
import Product from "../model/Product.js";


//@desc   create orders
//@route  POST /api/v1/order/createOrder
//@access private

export const createOrderController = asyncHandler(async(req,res)=>{ 
    //Get the payload(things we need for the order-customer, orderitems, shipping address, total price)
    const {orderItems, shippingAddress, totalPrice} = req.body;
    
    //Find the user
    const user = await User.findById(req.userAuthId);

    //check if user has shipping address
    if(!user?.hasShippingAddress){
        throw new Error("No shipping adress found, please add one");
    }

    //check if order is not empty
    if (orderItems.length<=0){
        throw new Error("No order items found");
    };

    //Place the order - save to db
    const order = await Order.create({
        user: req.userAuthId,
        orderItems,
        shippingAddress,
        totalPrice,
    })
    
    //push order into user
    user.orders.push(order?._id);
    await user.save();

    //update product quantity
    const products = await Product.find({_id:{$in:orderItems}}) 
    
    orderItems?.map(async (order)=>{
        const product = products?.find((product)=>{
            return product?._id.toString() === order?._id.toString();
        })
        if(product){
            product.totalSold += order.totalQtyBuying;
        }
        await product.save();
    })

    //make payment(stripe)
    
    //Payment webhook

    //Update user order
    res.json({
        success: true,
        msg:"order created",
        user, 
        order,
    });
});