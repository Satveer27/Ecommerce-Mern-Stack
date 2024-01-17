import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
    allProducts: [],
    product:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create product
export const createProductAction = createAsyncThunk('products/createProduct', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {name, description, category, sizes, brand, colors, price} = 
        payload;

        //Token-authenticated

        //images

        //make http req
        const response = await axios.post(`${baseURL}/products/createProduct`, {
            name, description, category, sizes, brand, colors, price
            
        })
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//product slices
const productSlice = createSlice({
    name:'products',
    initialState, 
    extraReducers: (builder)=>{
        //create product
        builder.addCase(createProductAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.product = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.product = null;
        });
        
    }
})

//generate reducer
const productReducer = productSlice.reducer;

export default productReducer;