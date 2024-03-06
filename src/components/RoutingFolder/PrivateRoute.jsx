import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  
    const {currUser} = useSelector((state) =>state.user_mod);
    return currUser ? <Outlet/> : <Navigate to = '/sign-in'></Navigate>
  
}
