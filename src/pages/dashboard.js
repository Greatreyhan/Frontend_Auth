import React, { useEffect, useState } from 'react'
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import axios from 'axios';
import Alert from '../utils/alert';

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState(0)
  const [totalAdmin, setTotalAdmin] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [alertMsg, setAlertMsg] = useState("")

  // Get KTP Record
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response_record = await axios.get("http://localhost:4000/ktp/count");
      const response_user = await axios.get("http://localhost:4000/users/total-user");
      const response_admin = await axios.get("http://localhost:4000/users/total-admin");
      setTotalRecords(response_record?.data);
      setTotalUser(response_user?.data);
      setTotalAdmin(response_admin?.data);
    } catch (error) {
      setAlertMsg(error?.message)
      }
  };


  return (
    <div className='w-full px-8 py-8'>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      <h1 className='text-3xl font-black text-gray-400'>Laporan Terbaru</h1>
      <div className='flex justify-around mt-8 gap-5'>

        {/* Data Total */}
        <div>
          <p className='text-gray-900'>Total KTP</p>
          <div className='flex text-gray-900 items-center mt-2'>
            <MdPersonAddAlt1 className='text-4xl mr-2' />
            <p className='text-5xl font-semibold text-rose-700'>{totalRecords?.data}</p>
          </div>
          <p className='text-xs text-gray-800 bg-gray-100 mt-2 px-4 py-1 rounded-full inline-block'>Jun 1 - Aug 1 2024</p>
        </div>

        {/* Sebaran Terbanyak */}
        <div className='px-8 w-3/12 bg-gray-100 py-6 rounded-3xl'>
          <div className='text-gray-900'>
            <p className='font-semibold text-sm text-gray-600'>Total Administrasi</p>
            <div className='flex items-end mt-2'>
              <IoMdTrendingUp className='text-4xl text-emerald-500 border rounded-full mr-2 border-emerald-500' />
              <p className='text-4xl font-bold text-gray-800'>{totalAdmin?.data}</p>
              <span className='text-xs'>orang</span>
            </div>
          </div>
        </div>

        {/* Sebaran Terkecil */}
        <div className='px-8 w-3/12 bg-gray-100 py-6 rounded-3xl'>
          <div className='text-gray-900'>
            <p className='font-semibold text-sm text-gray-600'>Total Koordinator</p>
            <div className='flex items-end mt-2'>
              <IoMdTrendingDown className='text-4xl text-rose-500 border rounded-full mr-2 border-rose-500' />
              <p className='text-4xl font-bold'>{totalUser?.data}</p>
              <span className='text-xs'>orang</span>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Dashboard