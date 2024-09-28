import React from 'react'

const Loading = () => {
    return (
    <div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-30 z-50'>
        <div className="inline-block text-rose-800 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    </div>
    )
}

export default Loading