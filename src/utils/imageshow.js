import React from 'react'
import { MdOutlineClose } from "react-icons/md";

const Imageshow = ({urlImageSlide, setUrlImageSlide}) => {
  return (
    <div className={` ${urlImageSlide != "" ? "block":"hidden"} w-screen h-screen bg-black bg-opacity-40 z-50 fixed top-0 left-0 flex justify-center items-center`}>
        <button onClick={()=>setUrlImageSlide("")} className='text-white top-5 right-10 absolute text-2xl bg-gray-50 rounded-full p-1.5 bg-opacity-40' type='button'><MdOutlineClose /></button>
        <img src={urlImageSlide} />
    </div>
  )
}

export default Imageshow