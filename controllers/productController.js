import Product from "../model/Product.js";
import asyncHandler from 'express-async-handler';

// @description Create new product
// @route POST /api/v1/products/createProduct
// @access Private/Admin

export const createProductController = asyncHandler(async(req,res)=>{
    const {name, description, brand, category,color, user, images, price, totalQuantity, } = req.body;

    const productExists = await Product.findOne({ name });
    if(productExists){
        throw new Error('Product already exists');
    }
    else{
        const createProduct = await Product.create({
            name,
            description,
            brand, 
            category,
            color,
            user: req.userAuthId,
            images,
            price,
            totalQuantity,
        });
        //push the product into categories

        res.status(200).json({
            status: 'Success',
            msg: `Product created `,
            data: createProduct,
        });

    }

});

// @description Get all products
// @route GET /api/products/allProducts
// @access Public

export const fetchProductController = asyncHandler(async(req,res)=>{
    const product = await Product.find();
    res.status(200).json({
        status:"Success",
        msg:"Products:",
        data: product,
    })
});