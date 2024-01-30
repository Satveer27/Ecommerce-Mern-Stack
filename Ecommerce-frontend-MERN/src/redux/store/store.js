import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlice";
import productReducer from "../slices/product/productSlices";
import categoryReducer from "../slices/categories/categorySlices";
import brandReducer from "../slices/categories/brandSlices";
import colourReducer from "../slices/categories/colourSlices";
import cartReducer from "../slices/cart/cartSlices";
import couponReducer from "../slices/coupons/couponsSlice";
import orderReducer from "../slices/orders/orderSlices";


//create store

const store = configureStore({
    reducer:{
       products: productReducer,
       users: userReducer,
       category: categoryReducer,
       brand: brandReducer,
       colour: colourReducer,
       cart: cartReducer,
       coupon: couponReducer,
       order: orderReducer,
    }
});

export default store;