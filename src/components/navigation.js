import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import UserProfile from "../assets/icons/user_profile.png"
import Loading from '../utils/loading';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdApps } from "react-icons/io";
import { MdInsertPageBreak } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { LogOut, reset } from "../features/authSlice"
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navShow, setNavShow] = useState(false)
  const {pathname} = useLocation(); 
  const { isError, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);


  return (
    <div className='fixed top-0 w-full flex items-center md:bg-none md:bg-opacity-0 bg-gray-100 justify-center z-50'>
      <div className='fixed bg-black w-full top-14 left-0 bg-opacity-80 flex'>
        {/* List Menu */}
        <div className={`pt-16 ${navShow ? "block" : "hidden"} left-0 h-screen text-left bg-gray-100 flex-col text-gray-800`}>
          <a href='/dashboard' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><IoMdApps className='text-2xl mr-1' /><span>Dashboard</span></a>
          <a href='/input-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><MdInsertPageBreak className='text-2xl mr-1' /><span>Input Data</span></a>
          <a href='/pengolahan-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><TbReportSearch className='text-2xl mr-1' /><span>Pengolahan Data</span></a>
          <a href='/report-data' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><TbReportAnalytics className='text-2xl mr-1' /><span>Report Data</span></a>
          {user?.role === "admin" ?
            <a href='/koordinator' className='cursor-pointer hover:font-semibold hover:text-rose-700 text-sm px-6 py-2 flex items-center'><IoMdPerson className='text-2xl mr-1' /><span>Koordinator</span></a>
            : null}
        </div>
        

      </div>
      {isLoading && <Loading />}
      <button type='button' onClick={()=>setNavShow(!navShow)} className='md:hidden px-6'>
        <GiHamburgerMenu className='text-2xl cursor-pointer' />
      </button>
      <div className='md:w-10/12 w-full px-6 mx-auto flex items-center justify-end'>
        <div className='bg-gray-100 pl-6 pr-2 py-2 rounded-bl-lg'>
          <img className='w-12 h-12' src={UserProfile} />
        </div>
        <div className='bg-gray-100 pr-8 pl-2 py-2 rounded-br-lg'>
          <p className='text-xl font-semibold'>{user ? user.name : ""}</p>
          <p className='text-sm capitalize'>{user ? user.role : ""}</p>
        </div>
      </div>
    </div>
  )
}

export default Navigation