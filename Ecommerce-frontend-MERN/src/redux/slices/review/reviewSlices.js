import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";
//initial state
const initialState = {
    reviews: [],
    review:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create review
export const createReviewAction = createAsyncThunk('review/createReview', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        const {rating, message, id} = 
        payload;
        
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }

        //make http req
        const response = await axios.post(`${baseURL}/reviews/${id}/createReview`, {rating, message}, config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//slice
const reviewSlice = createSlice({
    name:'review',
    initialState, 
    extraReducers: (builder)=>{
        //create review
        builder.addCase(createReviewAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createReviewAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.review = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createReviewAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.review = null;
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
const reviewReducer = reviewSlice.reducer;

export default reviewReducer;