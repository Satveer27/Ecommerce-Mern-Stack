import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
    brands: [],
    brand:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create brand
export const createBrandAction = createAsyncThunk('brand/createBrand', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {name} = 
        payload;
        
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.post(`${baseURL}/brand/createBrand`, {
            name
        }, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch brand
export const fetchBrandAction = createAsyncThunk('brand/fetch All', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.get(`${baseURL}/brand/allBrand`);   
        //save token to local storage 
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//brand slices
const brandSlice = createSlice({
    name:'brand',
    initialState, 
    extraReducers: (builder)=>{
        //create brand
        builder.addCase(createBrandAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createBrandAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.brand = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createBrandAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.brand = null;
        });

        //fetch brand
        builder.addCase(fetchBrandAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchBrandAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.brands = action.payload;

        });
        builder.addCase(fetchBrandAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.brands = null;
        });
        
    }
})

//generate reducer
const brandReducer = brandSlice.reducer;

export default brandReducer;