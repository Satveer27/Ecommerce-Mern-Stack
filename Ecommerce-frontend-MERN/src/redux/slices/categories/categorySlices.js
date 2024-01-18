import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

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
        const response = await axios.post(`${baseURL}/category/createCategory`, {
            name
        }, config)
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
        
    }
})

//generate reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;