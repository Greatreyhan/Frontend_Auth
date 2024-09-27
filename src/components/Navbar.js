import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {LogOut, reset} from "../features/authSlice"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);

    const handleLogout = (e)=>{
        e.preventDefault()
        dispatch(LogOut());
        dispatch(reset())
        navigate("/login")
    }
    return (
        <div>
            <Link to={`/`}>Home</Link>
            <Link to={`/login`}>Login</Link>
            <button onClick={e=>handleLogout(e)}>Log Out</button>
        </div>
    )
}

export default Navbar