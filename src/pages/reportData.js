import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { utils, writeFile } from 'xlsx';  // Import library xlsx
import PopUpDetailRecord from '../components/popUpDetailRecord';
import Alert from '../utils/alert';

const ReportData = () => {
  const [popUpDetail, setPopUpDetail] = useState(false);
  const [idRecordDetail, setIdRecordDetail] = useState(null);
  const [alertMsg, setAlertMsg] = useState("")


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

  // Filter data berdasarkan pencarian
  const filteredRecords = KTPRecord.filter(record =>
    record.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.kelurahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.kecamatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk ekspor data ke Excel
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(filteredRecords); // Convert data ke format sheet
    const workbook = utils.book_new(); // Membuat workbook baru
    utils.book_append_sheet(workbook, worksheet, 'DataKTP'); // Tambahkan sheet
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-'); // Format timestamp
    writeFile(workbook, `DataKTP_${timestamp}.xlsx`); // Simpan file Excel dengan timestamp
  };

  return (
    <div>
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
          </div>
          <div className="flex justify-end mb-4">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                  placeholder="Cari nama, nik, kecamatan atau kelurahan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.currentTarget.value)}
                />
              </div>
              <button type='submit' className="px-4 py-2 text-white bg-rose-700 rounded-lg hover:bg-rose-800">Cari</button>
            </form>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 text-white bg-rose-700 rounded-lg hover:bg-rose-800"
            >
              Export Data
            </button>
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
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                            <span className="relative">active</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button
                            onClick={(e) => handleShowDetail(e, record.uuid)}
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportData;
