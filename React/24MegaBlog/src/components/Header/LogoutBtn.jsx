import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import {logout} from '../../store/authSlice'
export function LogoutBtn() {

    const dispatch= useDispatch()
    const logoutHandler = () => {
    
        authService.logout().then(()=>{
            dispatch(logout())
        })
    
    }

    return (
        <>
           <div>Logobtn</div> 
        </>
    )
}
