import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";


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
        const {name, description, category, brand, color, price, files, totalQuantity} = 
        payload;
    
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
        console.log(name, description, category, brand, color, price, files, totalQuantity);
        //FormData
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("totalQuantity", totalQuantity);

        color.forEach((color) => {
            formData.append("color", color);
        });

        files.forEach((file) => {
            formData.append("files", file);
        });
            
        //make http req
        const response = await axios.post(`${baseURL}/products/createProduct`, 
            formData
        , config)
        

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch product
export const fetchProductAction = createAsyncThunk('products/list', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        
        //make http req
        const response = await axios.get(`${baseURL}/products/allProducts`)
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

        //fetch products
        builder.addCase(fetchProductAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.allProducts = action.payload;
        });
        builder.addCase(fetchProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.allProducts = null;
        });

        //create product
        builder.addCase(createProductAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.product = action.payload;
            state.isAdded = true;
        });
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isAdded = false
        })
         //reset error
         builder.addCase(resetErrAction.pending, (state, action)=>{
            state.error = null
        })
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