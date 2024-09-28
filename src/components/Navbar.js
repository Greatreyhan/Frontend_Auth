import React, { useEffect } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { IoMdApps } from "react-icons/io";
import { MdInsertPageBreak, MdInsertChart } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from "../features/authSlice"
import { useLocation } from 'react-router-dom';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const {pathname} = useLocation(); 

    useEffect(()=>{
        if(pathname === "/koordinator" && user?.role === "user"){
            navigate("/dashboard")
        }
    },[pathname])


    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(LogOut());
        dispatch(reset())
        navigate("/login")
    }
    return (
        <div className='w-2/12 h-screen bg-gray-200 flex flex-col justify-between py-8 fixed left-0 top-0 rounded-r-3xl'>

            {/* Logo */}
            <div>
                <p className='font-black text-xl text-rose-700 py-6 text-center'>Data Plasma.</p>
            </div>

            {/* List Menu */}
            <div className='pt-16 text-left flex flex-col text-gray-800 flex-1'>
                <a href='/dashboard' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><IoMdApps className='text-2xl mr-1' /><span>Dashboard</span></a>
                <a href='/input-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><MdInsertPageBreak className='text-2xl mr-1' /><span>Input Data</span></a>
                <a href='/pengolahan-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><TbReportSearch className='text-2xl mr-1' /><span>Pengolahan Data</span></a>
                <a href='/report-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><TbReportAnalytics className='text-2xl mr-1' /><span>Report Data</span></a>
                {user?.role === "admin" ?
                    <a href='/koordinator' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><IoMdPerson className='text-2xl mr-1' /><span>Koordinator</span></a>
                    : null}
            </div>

            {/* Logout */}
            <button onClick={(e) => handleLogout(e)} className='text-gray-800 cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><MdOutlineLogout className='text-2xl mr-1' /><span>Keluar</span></button>

        </div>
    )
}

export default Navbar