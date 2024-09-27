import React, { useState, useEffect } from 'react'
import { MdGrid3X3 } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import axios from 'axios';


const PopUpDetailRecord = ({ popUpDetail, setPopUpDetail, idRecordDetail }) => {
    const [dataNIK, setDataNIK] = useState('')
    const [dataNama, setDataNama] = useState('')
    const [dataTempatLahir, setDataTempatLahir] = useState('')
    const [dataTanggalLahir, setDataTanggalLahir] = useState('')
    const [dataJenisKelamin, setDataJenisKelamin] = useState('')
    const [dataGolonganDarah, setDataGolonganDarah] = useState('')
    const [dataAlamat, setDataAlamat] = useState('')
    const [dataRTRW, setDataRTRW] = useState('')
    const [dataKelurahan, setDataKelurahan] = useState('')
    const [dataKecamatan, setDataKecamatan] = useState('')
    const [dataAgama, setDataAgama] = useState('')
    const [dataStatusPerkawinan, setDataStatusPerkawinan] = useState('')
    const [dataPekerjaan, setDataPekerjaan] = useState('')
    const [dataKewarganegaraan, setDataKewarganegaraan] = useState('')
    const [fileKTP, setFileKTP] = useState(null)


    // Get KTP Record
    useEffect(() => {
        getKTPRecord();
    }, []);

    const getKTPRecord = async () => {
        try {
            const response = await axios.get("http://localhost:4000/ktp/" + idRecordDetail);
            if (response.status === 200) {
                setDataAgama(response.data.agama)
                setDataAlamat(response.data.alamat)
                setDataGolonganDarah(response.data.golongan_darah)
                setDataJenisKelamin(response.data.jenis_kelamin)
                setDataKecamatan(response.data.kecamatan)
                setDataKelurahan(response.data.kelurahan)
                setDataKewarganegaraan(response.data.kewarganegaraan)
                setDataNama(response.data.nama)
                setDataNIK(response.data.nik)
                setDataPekerjaan(response.data.pekerjaan)
                setDataRTRW(response.data.rt_rw)
                setDataStatusPerkawinan(response.data.status_perkawinan)
                setDataTanggalLahir(convertDateFormat(response.data.tanggal_lahir))
                setDataTempatLahir(response.data.tempat_lahir)
            }
        }
        catch (error) {
            console.log(error)
        }

    };

    const deleteKTPRecord = async () => {
        try{
          const response = await axios.delete("http://localhost:4000/ktp/"+idRecordDetail);
          console.log(response)
        }
        catch(error){
          console.log(error)
        }
        finally{
            setPopUpDetail(false)
        }
    
    };

    const updateKTPRecord = async (e) => {
        e.preventDefault()
        const dataInput = {
          nik: dataNIK,
          nama: dataNama,
          tempat_lahir: dataTempatLahir,
          tanggal_lahir: dataTanggalLahir,
          jenis_kelamin: dataJenisKelamin,
          golongan_darah: dataGolonganDarah,
          alamat: dataAlamat,
          rt_rw: dataRTRW,
          kelurahan: dataKelurahan,
          kecamatan: dataKecamatan,
          agama: dataAgama,
          status_perkawinan: dataStatusPerkawinan,
          pekerjaan: dataPekerjaan,
          kewarganegaraan: dataKewarganegaraan,
          file_name: "http:///"
        }
    
        try {
          const response = await axios.patch("http://localhost:4000/ktp/"+idRecordDetail,dataInput)
          if (response.status === 200) {
            console.log('Form update successfully!');
          } else {
            console.error('Form update failed!');
          }
    
        } catch (error) {
          console.log(error)
        } finally {
            setPopUpDetail(false)
        }
      }

    const convertDateFormat = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    }
    return (
        <div className='fixed py-8 flex justify-center w-screen h-full overflow-auto items-center z-50 left-0 top-0 bg-black bg-opacity-20'>

            <div className="bg-white absolute top-10 rounded-lg shadow">
                <form className='w-10/12 mx-auto py-6'>
                    <div className="flex flex-col mb-2">
                        <label className='text-sm text-gray-800 mb-2'>NIK</label>
                        <div className="flex relative ">
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <MdGrid3X3 />
                            </span>
                            <input required type="text" value={dataNIK} onChange={(e) => setDataNIK(e.currentTarget.value)} id="dataNIK" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="331212121212121" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className='text-sm text-gray-800 mb-2'>Nama</label>
                        <div className="flex relative ">
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <MdDriveFileRenameOutline />
                            </span>
                            <input required type="text" id="dataNama" value={dataNama} onChange={(e) => setDataNama(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex flex-col mb-2 flex-1">
                            <label className='text-sm text-gray-800 mb-2'>Tempat Lahir</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="text" id="dataTempatLahir" value={dataTempatLahir} onChange={(e) => setDataTempatLahir(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Tempat Lahir" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2 flex-1 ml-4">
                            <label className='text-sm text-gray-800 mb-2 ml-'>Tanggal Lahir</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="date" id="dataTanggalLahir" value={dataTanggalLahir} onChange={(e) => setDataTanggalLahir(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Tanggal Lahir" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex flex-col mb-2 flex-1">
                            <label className="text-sm text-gray-800 mb-2">Jenis Kelamin</label>
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <select id="jenis-kelamin" value={dataJenisKelamin} onChange={(e) => setDataJenisKelamin(e.currentTarget.value)} className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                                    <option value="" disabled selected>Pilih Jenis Kelamin</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2 flex-1 ml-4">
                            <label className="text-sm text-gray-800 mb-2">Golongan Darah</label>
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <select id="jenis-kelamin" value={dataGolonganDarah} onChange={(e) => setDataGolonganDarah(e.currentTarget.value)} className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                                    <option value="" disabled selected>Pilih Golongan Darah</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="col-span-2 flex-1">
                            <label className='text-sm text-gray-800 mb-2 ml-'>Alamat</label>
                            <textarea value={dataAlamat} onChange={(e) => setDataAlamat(e.currentTarget.value)} className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" id="comment" placeholder="Masukan Alamat Anda" name="dataAlamat" rows="7" cols="40">
                            </textarea>
                        </div>
                        <div className='ml-4 flex-1'>
                            <div className="flex flex-col mb-2 flex-1">
                                <label className='text-sm text-gray-800 mb-2 ml-'>RT/RW</label>
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <MdDriveFileRenameOutline />
                                    </span>
                                    <input required type="text" id="dataRTRW" value={dataRTRW} onChange={(e) => setDataRTRW(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2 flex-1">
                                <label className='text-sm text-gray-800 mb-2'>Kelurahan/Desa</label>
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <MdDriveFileRenameOutline />
                                    </span>
                                    <input required type="text" id="dataKelurahan" value={dataKelurahan} onChange={(e) => setDataKelurahan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2 flex-1">
                                <label className='text-sm text-gray-800 mb-2 ml-'>Kecamatan</label>
                                <div className="flex relative ">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <MdDriveFileRenameOutline />
                                    </span>
                                    <input required type="text" id="dataKecamatan" value={dataKecamatan} onChange={(e) => setDataKecamatan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex flex-col mb-2 flex-1">
                            <label className='text-sm text-gray-800 mb-2'>Agama</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="text" id="dataAgama" value={dataAgama} onChange={(e) => setDataAgama(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2 flex-1 ml-4">
                            <label className='text-sm text-gray-800 mb-2 ml-'>Status Perkawinan</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="text" id="dataStatusPerkawinan" value={dataStatusPerkawinan} onChange={(e) => setDataStatusPerkawinan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="flex flex-col mb-2 flex-1">
                            <label className='text-sm text-gray-800 mb-2'>Pekerjaan</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="text" id="dataPekerjaan" value={dataPekerjaan} onChange={(e) => setDataPekerjaan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2 flex-1 ml-4">
                            <label className='text-sm text-gray-800 mb-2 ml-'>Kewarganegaraan</label>
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdDriveFileRenameOutline />
                                </span>
                                <input required type="text" id="dataKewarganegaraan" value={dataKewarganegaraan} onChange={(e) => setDataKewarganegaraan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-8'>
                        <div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setPopUpDetail(!popUpDetail)
                            }} className='bg-white mr-4 text-rose-800 px-6 py-1.5 rounded-lg'>Kembali</button>
                        </div>
                        <div>
                            <button onClick={deleteKTPRecord} className='bg-rose-700 mr-4 text-white px-6 py-1.5 rounded-lg hover:bg-rose-800'>Delete</button>
                            <button onClick={updateKTPRecord} className='bg-rose-700 text-white px-6 py-1.5 rounded-lg hover:bg-rose-800'>Update</button>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default PopUpDetailRecord