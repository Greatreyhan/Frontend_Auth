import React, { useState, useEffect } from 'react'
import { MdGrid3X3 } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useParams } from 'react-router-dom';

const EditData = () => {


    // KTP Record Data
    const [KTPRecord, setKTPRecord] = useState([])
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

    const { idKtp } = useParams();

    useEffect(() => {
        console.log(idKtp)
        // Fetching data from the API
        fetch('http://localhost:4000/ktp/'+idKtp, {
            method: 'GET'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data[0].nik)
                setDataNIK(data.data[0].nik)
                setDataNama(data.data[0].nama)
                setDataTempatLahir(data.data[0].tempat_lahir)
                setDataTanggalLahir(data.data[0].tanggal_lahir)
                setDataJenisKelamin(data.data[0].jenis_kelamin)
                setDataGolonganDarah(data.data[0].golongan_darah)
                setDataAlamat(data.data[0].alamat)
                setDataRTRW(data.data[0].rt_rw)
                setDataKelurahan(data.data[0].kelurahan)
                setDataKecamatan(data.data[0].kecamatan)
                setDataAgama(data.data[0].agama)
                setDataStatusPerkawinan(data.data[0].status_perkawinan)
                setDataPekerjaan(data.data[0].pekerjaan)
                setDataKewarganegaraan(data.data[0].kewarganegaraan)
                setKTPRecord(data.data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])

    const handleUpdateData = async (e) => {
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
            kewarganegaraan: dataKewarganegaraan
        }
        console.log(dataInput)

        try {
            // setIsLoading(true);
            const response = await fetch('http://localhost:4000/ktp', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataInput),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                // navigate('/pengolahan-data');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            // setError(error.message);
        } finally {
            // setIsLoading(false);
        }
    }

    return (
        <div>
            <h1 className='w-10/12 mx-auto mt-16 text-3xl font-black text-gray-400'>Input Data Pengguna</h1>
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
                <div className='flex justify-end mt-8'>
                    <button onClick={(e) => handleUpdateData(e)} className='bg-rose-700 text-white px-6 py-1.5 rounded-lg hover:bg-rose-800'>Kirimkan</button>
                </div>
            </form>

        </div>
    )
}

export default EditData