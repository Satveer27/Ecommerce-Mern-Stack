import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";
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
        const {name, image} = 
        payload;

        //form-data
        const formData = new FormData();
        formData.append('name',name);
        image.forEach((file) => {
            formData.append("file", file);
        });
        
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.post(`${baseURL}/brand/createBrand`, formData, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//updated brand
export const updateBrandAction = createAsyncThunk('brand/updateBrand', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        console.log(payload);
        const {name, file, id} = 
        payload;

        //form-data
        const formData = new FormData();
        formData.append('name',name);
        file.forEach((file) => {
            formData.append("file", file);
        });

        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
        //make http req
        const response = await axios.put(`${baseURL}/brand/${id}/updateBrand`, formData, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//delete brand
export const deleteBrandAction = createAsyncThunk('brand/deleteBrand', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {id} = payload;

        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.delete(`${baseURL}/brand/${id}/deleteBrand`, config)
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

//fetch single brand
export const fetchSingleBrandAction = createAsyncThunk('brand/fetchSingle', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {id} = payload;

        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.get(`${baseURL}/brand/${id}`, config);   
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

        //update brand
        builder.addCase(updateBrandAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateBrandAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.brand = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updateBrandAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isUpdated = false;
            state.brand = null;
        });

        //delete brand
        builder.addCase(deleteBrandAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(deleteBrandAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.brand = action.payload;
            state.isDeleted = true;
        });
        builder.addCase(deleteBrandAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
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

        //fetch single brand
        builder.addCase(fetchSingleBrandAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchSingleBrandAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.brand = action.payload;

        });
        builder.addCase(fetchSingleBrandAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.brand = null;
        });
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isAdded = false;
            state.isDeleted = false;
            state.isUpdated = false;
        })
         //reset error
         builder.addCase(resetErrAction.pending, (state, action)=>{
            state.error = null
        })
    }
})

//generate reducer
const brandReducer = brandSlice.reducer;

export default brandReducer;