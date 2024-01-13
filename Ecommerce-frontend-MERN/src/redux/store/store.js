import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlice";
//create store

const store = configureStore({
    reducer:{
       users: userReducer,
    }
});

export default store;