import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdTrendingDown, IoMdTrendingUp,MdTrendingDown } from "react-icons/io";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state)=>state.auth)

    useEffect(()=>{
        dispatch(getMe())
    },[dispatch])

    useEffect(()=>{
        if(isError){
            navigate("/login")
        }
    }, [isError, navigate])

  return (
    <div className='w-full px-8 py-8'>
      
      <h1 className='text-3xl font-black text-gray-400'>Laporan Terbaru</h1>
      <div className='flex justify-around mt-8 gap-5'>

        {/* Data Total */}
        <div>
          <p className='text-gray-900'>Total Pengguna</p>
          <div className='flex text-gray-900 items-center mt-2'>
            <MdPersonAddAlt1 className='text-4xl mr-2' />
            <p className='text-5xl font-semibold text-rose-700'>81.798</p>
          </div>  
            <p className='text-xs text-gray-800 bg-gray-100 mt-2 px-4 py-1 rounded-full inline-block'>Jun 1 - Aug 1 2024</p>
        </div>

        {/* Sebaran Terbanyak */}
        <div className='px-8 w-3/12 bg-gray-100 py-6 rounded-3xl'>
          <div className='text-gray-900'>
            <p className='font-semibold text-sm text-gray-600'>Kelurahan Terbanyak</p>
            <div className='flex items-end mt-2'>
            <IoMdTrendingUp className='text-4xl text-emerald-500 border rounded-full mr-2 border-emerald-500' />
            <p className='text-4xl font-bold text-gray-800'>8.725</p>
            <span className='text-xs'>orang</span>
            </div>
          </div>
        </div>

        {/* Sebaran Terkecil */}
        <div className='px-8 w-3/12 bg-gray-100 py-6 rounded-3xl'>
          <div className='text-gray-900'>
            <p className='font-semibold text-sm text-gray-600'>Kelurahan Terkecil</p>
            <div className='flex items-end mt-2'>
            <IoMdTrendingDown className='text-4xl text-rose-500 border rounded-full mr-2 border-rose-500' />
            <p className='text-4xl font-bold'>25</p>
            <span className='text-xs'>orang</span>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Dashboard