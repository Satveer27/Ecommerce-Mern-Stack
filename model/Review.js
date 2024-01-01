import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is the blueprint for the model
const ReviewSchema = new Schema({ 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //error display message custome one
        required: [true, "Review must belong to a user"],
        ref: "User",
    },
    products:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products",
        //error display message custome one
        required: [true, "Review must belong to a product"],
    },
    message:{
        string: true,
        required: [true, "Please add a message"],
    },
    rating:{
        string,
        required: [true, "Please add a rating between 1 and 5"],
        min: 1,
        max: 5,
    }

}, {timestamps:true});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;