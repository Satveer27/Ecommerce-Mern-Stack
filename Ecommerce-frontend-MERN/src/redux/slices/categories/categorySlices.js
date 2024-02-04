import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";
//initial state
const initialState = {
    categories: [],
    category:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create category
export const createCategoryAction = createAsyncThunk('category/createCategory', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        console.log(payload);
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
                Authorization : `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
        //make http req
        const response = await axios.post(`${baseURL}/category/createCategory`, formData, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//updated category
export const updateCategoryAction = createAsyncThunk('category/updateCategory', async(payload, {rejectWithValue, getState, dispatch})=>{
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
        const response = await axios.put(`${baseURL}/category/${id}/updateCategory`, formData, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//delete category
export const deleteCategoryAction = createAsyncThunk('category/deleteCategory', async(payload, {rejectWithValue, getState, dispatch})=>{
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
        const response = await axios.delete(`${baseURL}/category/${id}/deleteCategory`, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch category
export const fetchCategoryAction = createAsyncThunk('category/fetch All', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.get(`${baseURL}/category/allCategory`);   
        //save token to local storage 
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//fetch single category
export const fetchSingleCategoryAction = createAsyncThunk('category/getOne', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {id} = payload;
        //make http req
        const response = await axios.get(`${baseURL}/category/${id}`);   
        //save token to local storage 
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//category slices
const categorySlice = createSlice({
    name:'category',
    initialState, 
    extraReducers: (builder)=>{
        //create category
        builder.addCase(createCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.category = null;
        });

        //update category
        builder.addCase(updateCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateCategoryAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updateCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isUpdated = false;
            state.category = null;
        });

        //delete category
        builder.addCase(deleteCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(deleteCategoryAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isDeleted = true;
        });
        builder.addCase(deleteCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
            state.category = null;
        });

        //fetch category
        builder.addCase(fetchCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.categories = null;
        });

         //fetch category
         builder.addCase(fetchSingleCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchSingleCategoryAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.category = action.payload;
        });
        builder.addCase(fetchSingleCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.category = null;
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
const categoryReducer = categorySlice.reducer;

export default categoryReducer;