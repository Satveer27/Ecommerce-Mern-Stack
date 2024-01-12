import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is the blueprint for the model
const BrandSchema = new Schema({ 
    name:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image:{
        type:String,
        required: true,
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products",
    }],

}, {timestamps:true});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;