import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is the blueprint for the model
const UserSchema = new Schema({
    username:{
        type:String, 
        required: true,
    },
    email:{
        type:String, 
        required: true,
    },
    password:{
        type:String, 
        required: true,
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList",
        }
    ],
    isAdmin:{
        type:Boolean, 
        default: false,
    },
    shippingAddress:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        address:{
            type:String
        },
        city:{
            type:String
        },
        postalCode:{
            type:String
        },
        country:{
            type:String
        },
        phone:{
            type:String
        },
    },
    profileImage:{
        type:String,
        default: "../utils/images"
    }
    },{
    timestamps: true
    //Date user is created and updated
    }
);

//Compile schema to model
const User = mongoose.model('User', UserSchema);

export default User;