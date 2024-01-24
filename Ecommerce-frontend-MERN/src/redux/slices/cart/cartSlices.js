import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";


//initial state
const initialState = {
    cartItems: [],
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//add product to cart
export const addOrderToCart = createAsyncThunk('cart/addToCart', async(cartItem)=>{
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    //push to local storage
    cartItems.push(cartItem)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
});

//get item from local storage
export const getItemFromStorageAction = createAsyncThunk('cart/getOrderItem', async(cartItem)=>{
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    
    return cartItems;
});

//change order item quantity
export const changeOrderQuantityAction = createAsyncThunk('cart/changeQuantity', async({productId, qty})=>{
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    //push to local storage
    const newCartItems = cartItems?.map((item)=>{
        if(item?._id?.toString() === productId?.toString()){
            //get new price
            const newPrice = item?.price * qty;
            item.totalQtyBuying = qty;
            item.totalPrice = newPrice;
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))
});

//remove product from cart
export const removeOrderFromCart = createAsyncThunk('cart/removeOrderItem', async(productId)=>{
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    
    const newItems = cartItems?.filter((item)=>(item?._id !== productId.productId));
    
    localStorage.setItem('cartItems', JSON.stringify(newItems))
});

//brand cart
const cartSlice = createSlice({
    name:'cart',
    initialState, 
    extraReducers: (builder)=>{
        //create cart
        builder.addCase(addOrderToCart.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(addOrderToCart.fulfilled, (state, action)=>{
            state.loading = false;
            state.cartItems = action.payload;
            state.isAdded = true;
        });
        builder.addCase(addOrderToCart.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.cartItems = null;
        });

        //fetch cart items
        builder.addCase(getItemFromStorageAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getItemFromStorageAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.cartItems = action.payload;
            state.isAdded = true;
        });
        builder.addCase(getItemFromStorageAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.cartItems = null;
        });

    
    }
})

//generate reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;