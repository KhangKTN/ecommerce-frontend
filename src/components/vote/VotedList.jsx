import React, { memo, useEffect, useRef, useState } from 'react'
import Rating from '../Rating'
import moment from 'moment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const VotedList = ({voteData, isBorder}) => {
    const [currentImg, setCurrentImg] = useState(null)
    const sliderRef = useRef();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: voteData?.images.length > 1 ? true : false,
        beforeChange: (current, next) => setCurrentImg(next)
    }

    useEffect(() => {
        setCurrentImg(null)
    }, [voteData])

    const handleClick = (index) => {
        if(currentImg === null) setCurrentImg(index)
        sliderRef.current?.slickGoTo(index)
    }

    return (
        <>
            <div className='flex gap-x-5'>
                <img className='size-12 rounded-full bg-slate-300' src="https://lh5.googleusercontent.com/proxy/b7aE9Mn5FCMO2HDvuyuUFFRONGzX3Cerpp-BiPfPzcoGhJDzpHc7DNARfVNp-oSZ14Yww9XR_zihJ9WEHrlKIqjqXM8XL9J8RZ8vGhCTYttooJO73nudWbDNqIMuqGFO" alt="" />
                <div key={voteData?.voteBy?._id} className=''>
                    <h1 className='font-semibold'>{voteData?.voteBy?.firstname}</h1>
                    <span className='text-sm text-gray-500'>
                        {new Date(voteData?.createdAt).toLocaleString()} ({moment(voteData?.createdAt).fromNow()})
                        {voteData?.productVariant && <span> | {voteData?.productVariant}</span>}
                    </span>
                    <Rating rating={voteData?.star} setStar={() => {}} />
                    <h1 className='mt-3'>{voteData?.comment}</h1>
                    <div className='flex gap-x-3 mt-3'>
                        {voteData?.images?.map((img, index) => (
                            <div key={img} className={`size-[64px] ${currentImg === index && 'p-[1px] border-2 border-main'}`}>
                                <img key={img} onClick={() => handleClick(index)} className={`size-full object-cover cursor-pointer`} src={img} alt="" />
                            </div>
                        ))}
                    </div>
                    {currentImg !== null && currentImg >= 0 &&
                        <div className='w-[370px] h-[500px]'>
                            <Slider ref={sliderRef} {...settings}>
                                {voteData?.images?.map((img, index) => (
                                    <img className={`w-[370px] h-[500px] mt-5 object-cover`} src={img} alt="" />
                                ))}
                            </Slider>
                        </div>
                    }
                </div>
            </div>
            {isBorder && <div className='h-[1px] w-full bg-gray-300 my-5'></div>}
        </>
    )
}

export default memo(VotedList)