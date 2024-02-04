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

//update coupon
export const updateCouponAction = createAsyncThunk('coupon/updateCoupon', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {code, discount, startDate, endDate, id} = 
        payload;
        
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.put(`${baseURL}/coupon/${id}/updateCoupon`, {code, discount, startDate, endDate}, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//delete coupon
export const deleteCouponAction = createAsyncThunk('coupon/deleteCoupon', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {id} = 
        payload;
        console.log(id)
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.delete(`${baseURL}/coupon/${id}/deleteCoupon`, config)
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
        //create coupon
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
            state.coupon = null;
        });

        //delete coupon
        builder.addCase(deleteCouponAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(deleteCouponAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.coupon = action.payload;
            state.isDeleted = true;
        });
        builder.addCase(deleteCouponAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
            state.coupon = null;
        });

        //update coupon
        builder.addCase(updateCouponAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateCouponAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.coupon = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updateCouponAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isUpdated = false;
            state.coupon = null;
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
            state.isAdded = false;
            state.isUpdated = false;
            state.isDeleted = false;
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