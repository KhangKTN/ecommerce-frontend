import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const Banner = () => {
    return (
        <div className={`w-full h-[470px] rounded-md overflow-hidden`}>
            <iframe className='w-full h-full' src="https://www.youtube.com/embed/SRmIaWeQFsE?si=kV5I1sSikrZgUqtW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}

export default Banner