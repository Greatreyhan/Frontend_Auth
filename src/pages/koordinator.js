import React, { useState, useEffect } from 'react'
import PopUpAddKoordinator from '../components/popUpAddKoordinator'
import axios from 'axios';

const Koordinator = () => {
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [coordinatorData, setCoordinatorData] = useState(null)

  // Get KTP Record
  useEffect(() => {
    getKoordinator();
  }, [popUpAdd]);

  const getKoordinator = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setCoordinatorData(response.data);
    }
    catch (error) {
      console.log(error)
    }

  };

  const deleteKoordinator = async (idUser) => {
    try {
      const response = await axios.delete("http://localhost:4000/users/" + idUser);
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setPopUpAdd(true)
      setPopUpAdd(false)
    }

  };

  return (
    <div>
      {popUpAdd ?
        <PopUpAddKoordinator popUpAdd={popUpAdd} setPopUpAdd={setPopUpAdd} />
        : null}
      <div class="container max-w-3xl px-4 mx-auto sm:px-8">
        <div class="py-8">
          <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h1 className='text-3xl font-black text-gray-400'>Data Koordinator</h1>
            <button onClick={() => setPopUpAdd(!popUpAdd)} className='px-8 py-2 bg-rose-700 rounded-lg text-white'> + Tambah Koordinator</button>
          </div>
          <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" class="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Nama
                    </th>
                    <th scope="col" class="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Role
                    </th>
                    <th scope="col" class="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Email
                    </th>
                    <th scope="col" class="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coordinatorData && coordinatorData.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div class="flex items-center">
                            <div>
                              <p class="text-gray-900 whitespace-no-wrap">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {user.role}
                          </p>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {user.email}
                          </p>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <a onClick={()=>deleteKoordinator(user.uuid)} class="text-indigo-600 cursor-pointer hover:text-indigo-900">
                            Hapus
                          </a>
                        </td>
                      </tr>
                    )
                  })}



                </tbody>
              </table>
              <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                <div class="flex items-center">
                  <button type="button" class="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                    <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                      </path>
                    </svg>
                  </button>
                  <button type="button" class="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                    1
                  </button>
                  <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                    2
                  </button>
                  <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                    3
                  </button>
                  <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                    4
                  </button>
                  <button type="button" class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                    <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Koordinator