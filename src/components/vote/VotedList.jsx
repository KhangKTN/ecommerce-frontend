import React, { memo, useEffect, useRef, useState } from 'react'
import Rating from '../Rating'
import moment from 'moment';
import Slider from "react-slick";
import { getReply, postReply } from '../../apis/vote';
import { useSelector } from 'react-redux';
import InputFields from '../InputFields';
import ButtonLoading from '../style/ButtonLoading';
import { toast } from 'react-toastify';
import './VoteList.css'

const VotedList = ({voteData, isBorder, reload}) => {
    const [currentImg, setCurrentImg] = useState(null)
    const [replyData, setReplyData] = useState(null)
    const [showFormReply, setShowFormReply] = useState(false)

    const sliderRef = useRef();
    const {current} = useSelector(state => state.user)
    const [replyContent, setReplyContent] = useState('')

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

    const fetchDataReply = async() => {
        const res = await getReply({voteId: voteData._id})
        if(res.success) setReplyData(res.data)
    }

    useEffect(() => {
        setCurrentImg(null)
        if(voteData?._id) fetchDataReply()
    }, [voteData])

    const handleClick = (index) => {
        if(currentImg === null) setCurrentImg(index)
        sliderRef.current?.slickGoTo(index)
    }

    const handleSubmitReply = async() => {
        const res = await postReply({voteId: voteData._id, comment: replyContent})
        if(res.success){
            toast.success(res.message)
            reload()
        }
        else{
            toast.error(res.message)
        }
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
                    <div className='flex gap-x-5'>
                        <Rating rating={voteData?.star} setStar={() => {}} />
                        {!replyData && current?.role === '1963' && <span onClick={() => setShowFormReply(true)} className='text-main italic font-bold cursor-pointer hover:underline'>Reply</span>

                        }
                    </div>
                    <h1 className='mt-3'>{voteData?.comment}</h1>
                    <div className='flex gap-x-3 mt-3'>
                        {voteData?.images?.map((img, index) => (
                            <div key={img} className={`size-[64px] ${currentImg === index && 'p-[1px] border-2 border-main'}`}>
                                <img key={img} onClick={() => handleClick(index)} className={`size-full object-cover cursor-pointer`} src={img} alt="" />
                            </div>
                        ))}
                    </div>
                    {replyData && 
                        <div className='bg-gray-200 mt-3 ml-5 px-4 py-3 rounded'>
                            <h1 className='font-semibold'>
                                Feedback from seller
                                <small className=''> ({moment(replyData?.createdAt).format('DD/MM/YYYY')})</small>
                            </h1>
                            <p className='text-gray-700'>{replyData?.comment}</p>
                        </div>
                    }
                    {showFormReply &&
                        <div className='bg-gray-200 rounded mt-3 p-5 animate-fade-in-fwd'>
                            <input onChange={(e) => setReplyContent(e.target.value)} value={replyContent} className='rounded bg-gray-100 focus:ring-1 focus:ring-sky-400 p-2 outline-none min-w-[400px]' type="text" placeholder='Write something...' /> <br />
                            {replyContent.trim().length < 10 && <small className='text-red-500'>Please input least 2 words and 10 characters!</small>}
                            <div className='flex justify-end gap-x-3 mt-5 text-main font-semibold'>
                                <button onClick={() => setShowFormReply(false)} className='pl-5 pr-4 py-2 border-2 border-main rounded-md'>Cancel</button>
                                <ButtonLoading handleClick={handleSubmitReply} text={'Send reply'} disabled={!(replyContent.trim().length >= 10 && replyContent.trim().split(' ').length >= 2)} />
                            </div>
                        </div>
                    }
                    {currentImg !== null && currentImg >= 0 &&
                        <div className='w-[370px] h-[500px]'>
                            <Slider className='image-slider' ref={sliderRef} {...settings}>
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