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
// @access 
//Filtering is also done in this section for users to filter and get products

export const fetchProductController = asyncHandler(async(req,res)=>{

    let productQuery = Product.find();

    //filter by name, name can come from the payload
    if(req.query.name){
        productQuery = productQuery.find({
            name:{$regex:req.query.name, $options:"i"},
        })
    }

    //filter by brand, name can come from the payload
    if(req.query.brand){
        productQuery = productQuery.find({
            brand:{$regex:req.query.brand, $options:"i"},
        })
    }

    //filter by category, name can come from the payload
    if(req.query.category){
        productQuery = productQuery.find({
            category:{$regex:req.query.category, $options:"i"},
        })
    }

    //filter by colours, name can come from the payload
    if(req.query.colour){
        productQuery = productQuery.find({
            color:{$regex:req.query.colour, $options:"i"},
        })
    }

    //filter by price range
    if(req.query.price){
        const priceRange = req.query.price.split("-");
        //gte and lte of query. Gte greater than or equal. Lte lesser than or equal
        productQuery = productQuery.find({ price:{$gte:priceRange[0], $lte:priceRange[1]} });
    }

    //await is to pause the async method to wait for query to finish
    const product = await productQuery;
  
    res.status(200).json({
        status:"Success",
        msg:"Products:",
        data: product,
    })
});

