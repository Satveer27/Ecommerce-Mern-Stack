import Product from "../model/Product.js";
import asyncHandler from 'express-async-handler';

// @description Create new product
// @route       POST /api/v1/products/createProduct
// @access      Private/Admin

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
// @route       GET /api/products/allProducts
// @access      Public
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

    //pagination
    //page(if user provide page, meaning what page are they at)
    const page = parseInt(req.query.page) ? parseInt(req.query.page) :1;

    //limit(limit of total product)
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) :10;

    //startIdx(what product we start to display on page)
    const startIndex = (page-1)*limit;

    //endIdx
    const endIndex = page * limit;

    //total
    const total = await Product.countDocuments();

    //Query a number of product depending on the amount needed for the particular page.
    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination result
    const pagination = {}
    if(endIndex<total){
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if(startIndex>0){
        pagination.before = {
            page: page - 1,
            limit,
        }
    }

    //await is to pause the async method to wait for query to finish
    const product = await productQuery;
  
    res.status(200).json({
        status:"Success",
        total: total,
        results:product.length,
        pagination,
        msg:"Products:",
        data: product,
    })
});

// @description Get a single product
// @route       GET /api/products/:id
// @access      Public

export const getSingleProductController = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new Error('Product not found')
    }
    res.json({
        status:"success",
        message: "product fetched",
        product,
    });
})

// @description update a product
// @route       PUT /api/products/:id/update
// @access      Private/Admin

export const updateProductController = asyncHandler(async(req, res)=>{
    const {name, description, brand, category,color, user, images, price, totalQuantity, } = req.body;

    //update
    const product = await Product.findByIdAndUpdate(req.params.id,{
            name,
            description,
            brand, 
            category,
            color,
            user,
            images,
            price,
            totalQuantity,
    },{
        new: true,
    });

    res.json({
        status:"success",
        message: "product updated",
        product,
    });
})