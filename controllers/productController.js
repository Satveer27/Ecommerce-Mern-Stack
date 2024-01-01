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

    let productQuery = Product.find();

    //search by name, name can come from the payload
    if(req.query.name){
        productQuery = productQuery.find({
            name:{$regex:req.query.name, $options:"i"},
        })
    }

    //search by brand, name can come from the payload
    if(req.query.brand){
        productQuery = productQuery.find({
            brand:{$regex:req.query.brand, $options:"i"},
        })
    }

    //search by category, name can come from the payload
    if(req.query.category){
        productQuery = productQuery.find({
            category:{$regex:req.query.category, $options:"i"},
        })
    }

     //search by colours, name can come from the payload
     if(req.query.colour){
        productQuery = productQuery.find({
            color:{$regex:req.query.colour, $options:"i"},
        })
    }

    //await is to pause the async method to wait for query to finish
    const product = await productQuery;
  
    res.status(200).json({
        status:"Success",
        msg:"Products:",
        data: product,
    })
});

