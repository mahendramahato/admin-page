import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    // let auth = { 'token' : false}
    let auth = localStorage.getItem("token")
    //console.log(auth)
    return (
        auth ? <Outlet/> : <Navigate to="/login_page" />
    )
}
export default ProtectedRoute
