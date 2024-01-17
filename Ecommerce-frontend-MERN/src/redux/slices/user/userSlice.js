import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction } from "../globalActions/globalAction";
//axios for http req

//createAsyncThunk is for external server req

//create Slice handle action

//initial state
const initialState = {
    loading: false,
    error: null,
    users: [],
    user :{},
    userAuth:{
        loading:false,
        error:null,
        userInfo:{},
    }
}

//login action
export const loginAction = createAsyncThunk('users/login', async({email,password}, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.post(`${baseURL}/users/login`, {
            email,
            password,
        })
        //save token to local storage
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        return response.data;
    }catch(e){
        console.log(e);
        return rejectWithValue(e?.response?.data);
    }
})

//register action
export const registerAction = createAsyncThunk('users/register', async({username, email, password}, {rejectWithValue, getState, dispatch})=>{
    try{
        //make http req
        const response = await axios.post(`${baseURL}/users/register`, {
            email,
            password,
            username,
        })
        return response.data;
    }catch(e){
        console.log(e);
        return rejectWithValue(e?.response?.data);
    }
})

//users slice
const usersSlice = createSlice({
    name:'users',
    initialState,
    extraReducers: (builder)=>{
        //handle actions
        //register
        builder.addCase(registerAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(registerAction.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(registerAction.rejected, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        });
        
        //login
        builder.addCase(loginAction.pending, (state, action)=>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginAction.fulfilled, (state, action)=>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        });
        builder.addCase(loginAction.rejected, (state, action)=>{
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
        });
        //reset err action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.userAuth.error = null;
            state.error = null;
        });
    } 
});

//generate reducer, use in store
const userReducer = usersSlice.reducer;

export default userReducer;