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
    user :null,
    profile: {},
    userAuth:{
        loading:false,
        error:null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
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

//update Shipping action
export const updateShippingAddress = createAsyncThunk('users/updateShipping', async({firstName, lastName, address, city, postalCode, country, phone}, {rejectWithValue, getState, dispatch})=>{
    try{
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        //make http req
        const response = await axios.put(`${baseURL}/users/updateShipping`, {
            firstName, lastName, address, city, postalCode, country, phone
        }, config)
        return response.data;
    }catch(e){
        console.log(e);
        return rejectWithValue(e?.response?.data);
    }
})


//update user profile action
export const getUserProfileAction = createAsyncThunk('users/profile-fetch', async(payload, {rejectWithValue, getState, dispatch})=>{
    try{
        //Token-authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers:{
                Authorization : `Bearer ${token}`,
            }
        }
        //make http req
        const response = await axios.get(`${baseURL}/users/profile`, config)
        return response.data;
    }catch(e){
        console.log(e);
        return rejectWithValue(e?.response?.data);
    }
})

//update logout action
export const logoutAction = createAsyncThunk('users/logout', async(payload, {rejectWithValue, getState, dispatch})=>{
    localStorage.removeItem('userInfo');
    return true;  
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

        //shipping address
        builder.addCase(updateShippingAddress.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateShippingAddress.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(updateShippingAddress.rejected, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        });

        //logout action
        builder.addCase(logoutAction.fulfilled, (state, action)=>{
            state.userAuth.userInfo = null
        });

        //profile
        builder.addCase(getUserProfileAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, action)=>{
            state.profile = action.payload;
            state.loading = false;
        });
        builder.addCase(getUserProfileAction.rejected, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
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