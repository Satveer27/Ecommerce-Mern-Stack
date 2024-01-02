import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is the blueprint for the model
const ProductSchema = new Schema({
    name:{
        type:String, 
        required: true,
    },
    description:{
        type:String, 
        required: true,
    },
    brand:{
        type:String, 
        required: true,
    },
    category:{
        type: String,
        ref: "Category", 
        required: true,
    },
    color:{
        type: [String],
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",

    },
    images:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    price:{
        type:Number,
        required: true,
    },
    totalQuantity:{
        type:Number,
        required: true,
    },
    totalSold:{
        type:Number,
        default:0,
    },
    },{
    timestamps: true,
    //Date product is created and updated
    
    toJSON:{ virtuals:true },
    }
);
//Virtuals - just adding a field to the database which will change as more data added to review.

//qty left
ProductSchema.virtual('qtyLeft').get(function(){
    const product = this
    return product.totalQuantity - product.totalSold;
})


//total number of ratings
ProductSchema.virtual('totalReviews').get(function(){
    //instance of this product
    const product = this;
    return product?.reviews?.length;
})

//find average rating
ProductSchema.virtual("averageRating").get(function(){
    let totalRating = 0;
    const product = this;
    product?.reviews?.forEach((review)=>{
        totalRating += review?.rating
    });
    const averageRating = Number(totalRating / product?.reviews?.length).toFixed(1);
    return averageRating;
});

//Compile schema to model
const Product = mongoose.model('Product', ProductSchema);

export default Product;