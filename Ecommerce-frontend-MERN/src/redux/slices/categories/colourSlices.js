import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetSuccessAction,resetErrAction } from "../globalActions/globalAction";
//initial state
const initialState = {
    colours: [],
    colour:{},
    loading:false,
    error: null,
    //optional
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create colour
export const createColourAction = createAsyncThunk('colour/createColour', async(name, {rejectWithValue, getState, dispatch})=>{
    try{
        console.log(name)
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        //make http req
        const response = await axios.post(`${baseURL}/color/createColor`, 
            {name}
        , config)
        //save token to local storage

        return response.data;
    }catch(e){
    
        return rejectWithValue(e?.response?.data);
    }
})

//fetch color
export const fetchColourAction = createAsyncThunk('colour/fetch All', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.get(`${baseURL}/color/allColor`);   
        //save token to local storage 
        return response.data;

    }catch(e){
        return rejectWithValue(e?.response?.data);
    }
})

//colour slices
const colourSlices = createSlice({
    name:'colour',
    initialState, 
    extraReducers: (builder)=>{
        //create colour
        builder.addCase(createColourAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createColourAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.colour = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createColourAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.colour = null;
        });

        //fetch colour
        builder.addCase(fetchColourAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchColourAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.colours = action.payload;

        });
        builder.addCase(fetchColourAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.colours = null;
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
const colourReducer = colourSlices.reducer;

export default colourReducer;