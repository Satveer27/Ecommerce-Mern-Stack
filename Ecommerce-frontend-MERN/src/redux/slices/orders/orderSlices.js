import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";


//initial state
const initialState = {
    allOrders: [],
    order:null,
    loading:false,
    error: null,
    isAdded: false,
    isUpdated: false,
    stats:null,
}

//create order
export const placeOrderAction = createAsyncThunk('order/placeOrder', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {orderItems, shippingAddress, totalPrice} = 
        payload;
    
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        
    
        //make http req
        const response = await axios.post(`${baseURL}/order/createOrder`, 
            {orderItems, shippingAddress, totalPrice}
        , config)
        
        localStorage.setItem("cartItems", JSON.stringify([]));
        return window.open(response?.data?.url);
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch order stats
export const fetchOrderStatsAction = createAsyncThunk('order/stats', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        
        //make http req
        const response = await axios.get(`${baseURL}/order/sales/sum`, config)
        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//get all order
export const fetchOrderAction = createAsyncThunk('order/list', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        
        //make http req
        const response = await axios.get(`${baseURL}/order/allOrder`, config)
        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//update order
export const updatedOrderAction = createAsyncThunk('order/updateOrder', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {status, id} = 
        payload;
    
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        
    
        //make http req
        const response = await axios.put(`${baseURL}/order/update/${id}`, 
            {status}
        , config)
        
        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})


//fetch single order
export const fetchSingleOrder = createAsyncThunk('order/details', async(orderId, {rejectWithValue, getState, dispatch})=>{
    try{
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        //make http req
        const response = await axios.get(`${baseURL}/order/${orderId}`, config)
        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//order slices
const orderSlice = createSlice({
    name:'orders',
    initialState, 
    extraReducers: (builder)=>{

        //fetch single order
        builder.addCase(fetchSingleOrder.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchSingleOrder.fulfilled, (state, action)=>{
            state.loading = false;
            state.order = action.payload;
        });
        builder.addCase(fetchSingleOrder.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.order = null;
        });

        //update order
        builder.addCase(updatedOrderAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updatedOrderAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.order = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updatedOrderAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.order = null;
            state.isUpdated = false;
        });

        //fetch order stats
        builder.addCase(fetchOrderStatsAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchOrderStatsAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.stats = action.payload;
        });
        builder.addCase(fetchOrderStatsAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.stats = null;
        });

        //fetch orders
        builder.addCase(fetchOrderAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchOrderAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.allOrders = action.payload;
        });
        builder.addCase(fetchOrderAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.allOrders = null;
        });

        //create order
        builder.addCase(placeOrderAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(placeOrderAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.order = action.payload;
            state.isAdded = true;
        });
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isAdded = false;
            state.isUpdated = false;
        })
         //reset error
         builder.addCase(resetErrAction.pending, (state, action)=>{
            state.error = null
        })
        builder.addCase(placeOrderAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.order = null;
        });
        
    }
})

//generate reducer
const orderReducer = orderSlice.reducer;

export default orderReducer;