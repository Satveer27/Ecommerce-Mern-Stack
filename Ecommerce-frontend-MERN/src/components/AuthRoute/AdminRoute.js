import React, { useEffect } from 'react'
import Login from '../Users/Forms/Login';
import { getUserProfileAction } from '../../redux/slices/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminRoute = ({children}) =>{
    //dispatch
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserProfileAction())
    },[dispatch])
    //get user from store
    const {userAuth} = useSelector(state=>state.users)
    //get user from local storage
    
    const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;
    if(!isAdmin) return <Login/>;
    return <>{children}</>;
}

export default AdminRoute
