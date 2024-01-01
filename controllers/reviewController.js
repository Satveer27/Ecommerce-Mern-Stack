import Review from "../model/Review.js";
import asyncHandler from 'express-async-handler';
import Product from "../model/Product.js";

// @description Create new review
// @route       POST /api/v1/reviews/createReview
// @access      Private/User

export const createReviewController = asyncHandler(async(req,res)=>{
    const {product, message, rating} = req.body;

    //1. Find product we want to review
    const { productId } = req.params;
    const productFound = await Product.findById(productId).populate("reviews");
    
    if(!productFound){
        throw Error("Product not found");
    }
    
    //2. Check if user alrdy review product
    const hasReviewed = productFound?.reviews?.find((review)=>{
        return review?.user?.toString() === req.userAuthId.toString();
    });

    if(hasReviewed){
        throw Error("U have alrdy review this product");
    };

    //3. create review
    const createReview = await Review.create({
        message,
        rating, 
        products: productFound?._id,
        user: req.userAuthId,
    })
    
    //4. push review into product
    productFound.reviews.push(createReview?._id)
    //resave
    await productFound.save();
    
    //response
    res.json({
        success: true,
        msg:"review created succesfully",
        createReview,
    });
})