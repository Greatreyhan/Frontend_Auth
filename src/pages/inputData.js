import React, { useState, useRef } from 'react'
import { MdGrid3X3 } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdOutlineDone, MdOutlineClose, MdOutlineDocumentScanner } from "react-icons/md";
import Loading from '../utils/loading';
import Alert from '../utils/alert';


const InputData = () => {
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
  const [isLoading, setIsLoading] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")


  const navigate = useNavigate();

  const handleKirimData = async (e) => {
    setIsLoading(true)
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
      file_name: ("http://localhost:4000" + fileKTP)
    }

    // Check if any value is an empty string
    const isValid = Object.values(dataInput).every(value => value !== "");

    // Output result
    if (!isValid) {
      setAlertMsg("Input tidak boleh kosong!")
      setIsLoading(false)
      return ;
    } 

    if(fileKTP == ""){
      setAlertMsg("Silahkan masukkan gambar KTP")
      setIsLoading(false)
      return ;
    }

    try {
      const response = await axios.post("http://localhost:4000/ktp", dataInput)
      if (response.status === 201) {
        console.log('Form submitted successfully!');
        navigate('/pengolahan-data');
      } else {
        console.error('Form submission failed!');
      }

    } catch (error) {
      setAlertMsg(error?.message)

    } finally {
      setIsLoading(false)
    }
  }

  const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  }

  const handleScanKTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!fileKTP) {
      setAlertMsg("Silahkan masukkan gambar KTP!")
      setIsLoading(false)
      return;
    }
    const formData = new FormData();
    formData.append('ktp', fileKTP);
    try {
      const response = await fetch('http://localhost:4000/ktp/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('File uploaded successfully', data);
      console.log(response)
      setDataAgama(data?.data.agama)
      setDataAlamat(data?.data.alamat)
      setDataGolonganDarah(data?.data.golongan_darah)
      setDataJenisKelamin(data?.data.jenis_kelamin)
      setDataKecamatan(data?.data.kecamatan)
      setDataKelurahan(data?.data.kelurahan)
      setDataKewarganegaraan(data?.data.kewarganegaraan)
      setDataNama(data?.data.nama)
      setDataNIK(data?.data.nik)
      setDataPekerjaan(data?.data.pekerjaan)
      setDataRTRW(`${data.data.rt}/${data.data.rw}`)
      setDataStatusPerkawinan(data?.data.status_perkawinan)
      setDataTanggalLahir(convertDateFormat(data?.data.tanggal_lahir))
      setDataTempatLahir(data?.data.tempat_lahir)
      setFileKTP(data?.imagePath)

    } catch (error) {
      setAlertMsg(error?.message)
    }
    setIsLoading(false)
  }

  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    inputFileRef.current.click(); // Trigger input file ketika button diklik
  };

  const handleFileChange = (e) => {
    console.log(e.currentTarget.files[0]);
    setFileKTP(e.currentTarget.files[0]);
  };

  return (
    <div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      {isLoading && <Loading />}
      <div className='flex w-10/12 mx-auto mt-16 justify-between items-center'>
        <h1 className="text-3xl font-black text-gray-400">Input Data Pengguna</h1>
        <div className='flex gap-4'>
          <div className=''>
            <button className={`${fileKTP ? "bg-red-700 text-white" : "bg-gray-100 text-rose-700 hover:bg-gray-200"}  px-6 py-2.5 rounded-md flex items-center gap-1`} type="button" onClick={handleButtonClick}>
              {fileKTP ? <MdOutlineDone /> : <MdOutlineClose />}
              <span>Upload KTP</span>
            </button>

          </div>
          <button onClick={(e) => handleScanKTP(e)} className='flex bg-red-700 px-6 py-2.5 rounded-md text-white uppercase font-semibold shadow hover:shadow-none hover:bg-red-800 items-center gap-1'><MdOutlineDocumentScanner /><span>Scan</span></button>
        </div>
      </div>
      <form onSubmit={(e) => handleKirimData(e)} className='w-10/12 mx-auto py-6'>
        <input
          ref={inputFileRef}
          onChange={handleFileChange}
          type="file"
          name="gambar-ktp"
          style={{ display: 'none' }}  // Sembunyikan input file
        />
        <div className="flex flex-col mb-2">
          <label className='text-sm text-gray-800 mb-2'>NIK</label>
          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <MdGrid3X3 />
            </span>
            <input required={true} type="text" value={dataNIK} onChange={(e) => setDataNIK(e.currentTarget.value)} id="dataNIK" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="331212121212121" />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className='text-sm text-gray-800 mb-2'>Nama</label>
          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <MdDriveFileRenameOutline />
            </span>
            <input required={true} type="text" id="dataNama" value={dataNama} onChange={(e) => setDataNama(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Nama Anda" />
          </div>
        </div>
        <div className='md:flex justify-between'>
          <div className="flex flex-col mb-2 flex-1">
            <label className='text-sm text-gray-800 mb-2'>Tempat Lahir</label>
            <div className="flex relative ">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <input required={true} type="text" id="dataTempatLahir" value={dataTempatLahir} onChange={(e) => setDataTempatLahir(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Tempat Lahir" />
            </div>
          </div>
          <div className="flex flex-col mb-2 flex-1 md:ml-4">
            <label className='text-sm text-gray-800 mb-2'>Tanggal Lahir</label>
            <div className="flex relative ">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <input required={true} type="date" id="dataTanggalLahir" value={dataTanggalLahir} onChange={(e) => setDataTanggalLahir(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Tanggal Lahir" />
            </div>
          </div>
        </div>
        <div className='md:flex justify-between'>
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
          <div className="flex flex-col mb-2 flex-1 md:ml-4">
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
        <div className='md:flex justify-between'>
          <div className="col-span-2 flex-1">
            <label className='text-sm text-gray-800 mb-2'>Alamat</label>
            <textarea value={dataAlamat} onChange={(e) => setDataAlamat(e.currentTarget.value)} className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" id="comment" placeholder="Masukan Alamat Anda" name="dataAlamat" rows="7" cols="40">
            </textarea>
          </div>
          <div className='md:ml-4 flex-1'>
            <div className="flex flex-col mb-2 flex-1">
              <label className='text-sm text-gray-800 mb-2'>RT/RW</label>
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdDriveFileRenameOutline />
                </span>
                <input required={true} type="text" id="dataRTRW" value={dataRTRW} onChange={(e) => setDataRTRW(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="RT/RW" />
              </div>
            </div>
            <div className="flex flex-col mb-2 flex-1">
              <label className='text-sm text-gray-800 mb-2'>Kelurahan/Desa</label>
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdDriveFileRenameOutline />
                </span>
                <input required={true} type="text" id="dataKelurahan" value={dataKelurahan} onChange={(e) => setDataKelurahan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Desa/Kelurahan" />
              </div>
            </div>
            <div className="flex flex-col mb-2 flex-1">
              <label className='text-sm text-gray-800 mb-2'>Kecamatan</label>
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdDriveFileRenameOutline />
                </span>
                <input required={true} type="text" id="dataKecamatan" value={dataKecamatan} onChange={(e) => setDataKecamatan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Kecamatan" />
              </div>
            </div>
          </div>
        </div>
        <div className='md:flex justify-between'>

          <div className="flex flex-col mb-2 flex-1">
            <label className="text-sm text-gray-800 mb-2">Agama</label>
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <select id="dataAgama" value={dataAgama} onChange={(e) => setDataAgama(e.currentTarget.value)} className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                <option value="" disabled selected>Pilih Agama</option>
                <option className='capitalize' value="islam">islam</option>
                <option className='capitalize' value="kriten">kriten</option>
                <option className='capitalize' value="hindu">hindu</option>
                <option className='capitalize' value="budha">budha</option>
                <option className='capitalize' value="konghucu">kong hu cu</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col mb-2 flex-1 md:ml-4">
            <label className="text-sm text-gray-800 mb-2">Status Perkawinan</label>
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <select id="dataAgama" value={dataStatusPerkawinan} onChange={(e) => setDataStatusPerkawinan(e.currentTarget.value)} className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                <option value="" disabled selected>Pilih Status Perkawinan</option>
                <option className='capitalize' value="kawin">kawin</option>
                <option className='capitalize' value="belum kawin">belum kawin</option>
                <option className='capitalize' value="cerai hidup">cerai hidup</option>
                <option className='capitalize' value="cerai mati">cerai mati</option>
              </select>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className='md:flex justify-between'>

          <div className="flex flex-col mb-2 flex-1">
            <label className='text-sm text-gray-800 mb-2'>Pekerjaan</label>
            <div className="flex relative ">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <input required={true} type="text" id="dataPekerjaan" value={dataPekerjaan} onChange={(e) => setDataPekerjaan(e.currentTarget.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent" placeholder="Pekerjaan" />
            </div>
          </div>

          <div className="flex flex-col mb-2 flex-1 md:ml-4">
            <label className="text-sm text-gray-800 mb-2">Kewarganegaraan</label>
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdDriveFileRenameOutline />
              </span>
              <select id="dataAgama" value={dataKewarganegaraan} onChange={(e) => setDataKewarganegaraan(e.currentTarget.value)} className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                <option value="" disabled selected>Pilih Kewarganegaraan</option>
                <option value="WNA">WNA</option>
                <option value="WNI">WNI</option>
              </select>
            </div>
          </div>

          <div>
          </div>
        </div>
        <div className='flex justify-end mt-8'>
          <button type="submit" className='bg-rose-700 text-white px-6 py-1.5 rounded-lg hover:bg-rose-800'>Kirimkan</button>
        </div>
      </form>

    </div>
  )
}

export default InputData