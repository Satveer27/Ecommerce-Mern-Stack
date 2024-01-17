import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlice";
import productReducer from "../slices/product/productSlices";

//create store

const store = configureStore({
    reducer:{
       products: productReducer,
       users: userReducer,
    }
});

export default store;