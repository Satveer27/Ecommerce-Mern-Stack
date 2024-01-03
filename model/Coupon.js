import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        require:true,
        default:0,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true, toJSON:{virtuals:true},})

//coupon is expired
CouponSchema.virtual('isExpired').get(function(){
    return this.endDate< Date.now();
});

//validation
//check if enddate<startdate
CouponSchema.pre('validate', function(next){
    if(this.endDate<this.startDate){
        next(new Error('End date cant be less than start date'));
    }
    next();
});

//check discount is less than 0
CouponSchema.pre('validate', function(next){ 
    if(this.discount <= 0 || this.discount>100){
        next(new Error('Discount cant be less than 0 or more than 100'));
    }
    next();
});

//starting date cant be less than current date
CouponSchema.pre('validate', function(next){ 
    if(this.startDate< Date.now()){
        next(new Error('Start date cant be less than today'));
    }
    next();
});

//end date cant be less than current date
CouponSchema.pre('validate', function(next){ 
    if(this.endDate< Date.now()){
        next(new Error('End date cant be less than today'));
    }
    next();
});


const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;