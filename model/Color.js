import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is the blueprint for the model
const ColorSchema = new Schema({ 
    name:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

}, {timestamps:true});

const Color = mongoose.model("Color", ColorSchema);

export default Color;