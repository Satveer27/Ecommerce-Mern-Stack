import mongoose from "mongoose";
const Schema = mongoose.Schema;

//generate random numbers for order
const randomText = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:[
        {
            //can also use ref = "product"
            type:Object,
            required:true,
        }
    ],
    shippingAddress:{
        type:Object,
        required:true,
    },
    orderNumber:{
        type:String,
        require:true,
        default: randomText + randomNumber
    },
    //for stripe payment
    paymentStatus:{
        type:String,
        required:true,
        default:"Not paid"
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"Not specified",
    },
    currency:{
        type:String,
        default:"Not specified",
    },
    //For admin
    status:{
        type:String,
        default:"pending",
        enum:['pending', 'processing', 'shipped', 'delivered'],
    },
    deliveredAt:{
        type:Date,
    },
    totalPrice:{
        type:Number,
        default:0.0,
    },

},{timestamps:true});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
