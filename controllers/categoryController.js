import Category from "../model/Category.js";
import asyncHandler from 'express-async-handler';

//@description  Create new category
//@route        POST /api/v1/categories
//@access       Private/Admin

export const createCategoryCtrl = asyncHandler(async(req,res)=>{
    const{name, user ,image} = req.body
    //check if category exist
    const categoryFound = await Category.findOne({name})
    if(categoryFound){
        throw new Error("Category exist already");
    }
    const newCategory = await Category.create({
        name,
        user: req.userAuthId,
        image,
    });

    res.json({
        status:"success",
        msg:"Category created succesfully",
        newCategory,
    })
})