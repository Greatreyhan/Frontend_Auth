import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PopUpDetailRecord from '../components/popUpDetailRecord';
import Alert from '../utils/alert';
import { MdOutlineImage, MdEditDocument } from "react-icons/md";
import Imageshow from '../utils/imageshow';

const PengolahanData = () => {
  const [popUpDetail, setPopUpDetail] = useState(false);
  const [idRecordDetail, setIdRecordDetail] = useState(null);
  const [alertMsg, setAlertMsg] = useState("")
  const [urlImageSlide, setUrlImageSlide] = useState("")

  // KTP Record Data
  const [KTPRecord, setKTPRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan kata kunci pencarian

  // Get KTP Record
  useEffect(() => {
    getKTPRecord();
  }, [popUpDetail]);

  const getKTPRecord = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ktp");
      setKTPRecord(response.data);
    } catch (error) {
      // console.log(error);
      setAlertMsg(error?.message)
    }
  };

  const handleShowDetail = (e, idktp) => {
    e.preventDefault();
    setIdRecordDetail(idktp);
    setPopUpDetail(true);
  };

  // Event handler untuk input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter data berdasarkan pencarian
  const filteredRecords = KTPRecord.filter(record =>
    record.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.kelurahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.kecamatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Imageshow urlImageSlide={urlImageSlide} setUrlImageSlide={setUrlImageSlide} />
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      {popUpDetail && (
        <PopUpDetailRecord
          popUpDetail={popUpDetail}
          setPopUpDetail={setPopUpDetail}
          idRecordDetail={idRecordDetail}
        />
      )}
      <div className="container px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h1 className="text-3xl font-black text-gray-400">Data Pengguna</h1>
            <div className="text-end">
              <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className="relative">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="Cari nama, nik, kecamatan atau kelurahan"
                    value={searchTerm}
                    onChange={handleSearchChange} // Update kata kunci pencarian
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Nama
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      NIK
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Kelurahan
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      Kecamatan
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                      KTP
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-5 text-center text-sm bg-white border-b border-gray-200">
                        Tidak ada data yang sesuai.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <tr key={record.idktp}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{record.nama}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{record.nik}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{record.kelurahan}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{record.kecamatan}</p>
                        </td>
                        <td className="px-5 text-center py-3 text-sm bg-white border-b border-gray-200">
                          <button onClick={()=>setUrlImageSlide(record.file_name)} className="relative inline-block px-1.5 py-1.5 font-semibold text-xl bg-green-200 rounded-full text-green-800">
                            <MdOutlineImage />
                          </button>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button
                            onClick={(e) => handleShowDetail(e, record.uuid)}
                            href="#"
                            className="relative inline-block px-1.5 py-1.5 font-semibold text-xl bg-rose-200 rounded-full text-rose-800"
                          >
                            <MdEditDocument />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
  );
};

export default PengolahanData;
