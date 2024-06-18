import React, { memo, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModalImage = ({setIsShow, listImage, name}) => {
    const [indexCurrentImg, setIndexCurrentImg] = useState(0)

    const handleSlide = (action) => {
        const sizeListImg = listImage?.length - 1
        if(action === 'next'){
            if(indexCurrentImg === sizeListImg) setIndexCurrentImg(0)
            else setIndexCurrentImg(indexCurrentImg + 1)
        }
        else{
            if(indexCurrentImg === 0) setIndexCurrentImg(sizeListImg)
            else setIndexCurrentImg(indexCurrentImg - 1)
        }
    }

    return (
        <>
            <div id="static-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div onClick={() => setIsShow(false)} className='w-full h-full bg-[#00000024]'></div>
                <div className="absolute w-[850px] z-100">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex h-[80px] items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {name}
                            </h3>
                            <button onClick={() => setIsShow(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="flex p-4 md:p-5 space-y-4">
                            <div className='relative w-[6/10] h-full flex-1'>
                                <span onClick={() => handleSlide('next')} className='absolute top-1/2 -translate-y-1/2 right-0 text-2xl rounded-full flex items-center justify-center cursor-pointer text-main size-10 hover:bg-white'><i className="fa-solid fa-chevron-right"></i></span>
                                <span onClick={() => handleSlide('')} className='absolute top-1/2 -translate-y-1/2 left-0 text-2xl rounded-full flex items-center justify-center cursor-pointer text-main size-10 hover:bg-white'><i className="fa-solid fa-chevron-left"></i></span>
                                <img className='w-full h-[450px] object-contain' src={listImage[indexCurrentImg]} alt="currentImg" />
                            </div>
                            <div className='bg-gray-300 w-[1px] mx-2 h-2/3'></div>
                            <div className='w-[4/10] grid grid-cols-3 gap-3 h-fit'>
                                {listImage?.map((item, index) => (
                                    <div className='h-[80px]'>
                                        <img onClick={() => setIndexCurrentImg(index)} key={index} className={`h-[80px] w-[80px] object-contain cursor-pointer ` + (index === indexCurrentImg ? 'border-2 border-sky-500' : '')} src={item} alt='more-img-product' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ModalImage)