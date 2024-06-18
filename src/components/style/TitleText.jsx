import React from 'react'

const TitleText = ({text, size}) => {
    return (
        <div className='mb-5 flex items-center'>
            <div className='h-[45px] w-[4px] bg-main rounded-full mr-3'></div>
            <h1 className={`tracking-wide bg-gradient-to-br from-[#0acffe] to-[#495aff] inline-block text-transparent bg-clip-text font-extrabold ${size ? size : 'text-4xl'}`}>
                {text}
            </h1>
        </div>
    )
}

export default TitleText