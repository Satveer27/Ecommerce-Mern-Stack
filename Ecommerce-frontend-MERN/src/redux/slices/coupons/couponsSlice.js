import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";
//initial state
const initialState = {
    coupons: [],
    coupon:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create coupon
export const createCouponAction = createAsyncThunk('coupon/createCoupon', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {code, discount, startDate, endDate} = 
        payload;
        
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.post(`${baseURL}/coupon/createCoupon`, {code, discount, startDate, endDate}, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch all coupons
export const fetchCouponAction = createAsyncThunk('coupon/fetch All', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.get(`${baseURL}/coupon/allCoupon`);   
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//fetch single coupon
export const fetchSingleCouponAction = createAsyncThunk('coupon/fetch single', async(code, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.get(`${baseURL}/coupon/single?code=${code}`, {code});   
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//slice
const couponSlice = createSlice({
    name:'coupon',
    initialState, 
    extraReducers: (builder)=>{
        //create brand
        builder.addCase(createCouponAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createCouponAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.coupon = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createCouponAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.brand = null;
        });

        //fetch coupon
        builder.addCase(fetchCouponAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCouponAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.coupons = action.payload;

        });
        builder.addCase(fetchCouponAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.brands = null;
        });

         //fetch single coupon
         builder.addCase(fetchSingleCouponAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchSingleCouponAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.coupon = action.payload;
            state.isAdded = true;
        });
        builder.addCase(fetchSingleCouponAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.coupon = null;
            state.isAdded = false;
        });


        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isAdded = false
        })
         //reset error
         builder.addCase(resetErrAction.pending, (state, action)=>{
            state.error = null
        })
    }
})

//generate reducer
const couponReducer = couponSlice.reducer;

export default couponReducer;