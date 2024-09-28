import React, { useState } from 'react'
import axios from 'axios'

const PopUpAddKoordinator = ({ popUpAdd, setPopUpAdd }) => {
  const [namaKoordinator, setNamaKoordinator] = useState('')
  const [roleKoordinator, setRoleKoordinator] = useState('')
  const [emailKoordinator, setEmailKoordinator] = useState('')
  const [passwordKoordinator, setPasswordKoordinator] = useState('')

  const createNewKoordinator = async (e) => {
    e.preventDefault()
    const dataInput = {
      name: namaKoordinator,
      email: emailKoordinator,
      password: passwordKoordinator,
      confpassword: passwordKoordinator,
      role: roleKoordinator,
    }

    try {
      const response = await axios.post("http://localhost:4000/users",dataInput)
      if (response.status === 201) {
        console.log('New Coordinator created successfully!');
      } else {
        console.error('New Coordinator failed!');
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPopUpAdd(false)
    }
  }

  return (
    <div className='fixed flex justify-center w-screen h-screen items-center z-50 left-0 top-0 bg-black bg-opacity-20'>

      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300">
              </div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">
                Tambahkan Koordinator
              </span>
            </div>
          </div>
          <div className="mt-6">
            <form className="w-full space-y-6">
              <div className="w-full">
                <div className="relative ">
                  <label className='text-sm text-gray-900 mb-2'>Nama Koordinator</label>
                  <input required onChange={e => setNamaKoordinator(e.currentTarget.value)} value={namaKoordinator} type="text" id="namaKoordinator" className="mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama" />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <label className="text-sm text-gray-900 mb-2">Role Koordinator</label>
                  <select
                    required
                    value={roleKoordinator}
                    onChange={(e) => setRoleKoordinator(e.target.value)} // Pastikan ada handler untuk mengubah state
                    id="roleKoordinator"
                    className="mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                  >
                    <option value="" disabled>Pilih Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <div className="relative ">
                  <label className='text-sm text-gray-900 mb-2'>Email</label>
                  <input required onChange={e => setEmailKoordinator(e.currentTarget.value)} value={emailKoordinator} type="email" id="emailKoordinator" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="email@gmail.com" />
                </div>
              </div>
              <div className="w-full">
                <div className="relative ">
                  <label className='text-sm text-gray-900 mb-2'>Password</label>
                  <input required onChange={e => setPasswordKoordinator(e.currentTarget.value)} value={passwordKoordinator} type="password" id="passwordKoordinator" className="mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="*****" />
                </div>
              </div>

              <div>
                <span className="flex w-full rounded-md shadow-sm">
                  <button onClick={() => setPopUpAdd(!popUpAdd)} type="button" className="py-2 px-4 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold ">
                    Kembali
                  </button>
                  <button onClick={(e)=>createNewKoordinator(e)} type="submit" className="py-2 px-4  bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 focus:ring-offset-rose-200 text-gray-100 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Tambahkan
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  )
}

export default PopUpAddKoordinator