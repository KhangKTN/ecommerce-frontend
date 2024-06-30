import React, { memo, useCallback, useEffect, useState } from 'react'
import Rating from './Rating'
import { getInfoVoteSummary, getRating, getVoting, postRating } from '../apis/product'
import Votebar from './Votebar'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'
import ReactPaginate from 'react-paginate';
import ButtonLoading from './style/ButtonLoading'
import VotedList from './vote/VotedList'


const filterReview = [
    {id: 1, text: 'All', key: '', value: ''},
    {id: 2, text: '5 star', key: 'star', value: 5},
    {id: 3, text: '4 star', key: 'star', value: 4},
    {id: 4, text: '3 star', key: 'star', value: 3},
    {id: 5, text: '2 star', key: 'star', value: 2},
    {id: 6, text: '1 star', key: 'star', value: 1},
    {id: 7, text: 'Comment', key: 'comment', value: true},
    {id: 8, text: 'Image', key: 'images', value: true}
]

let timeout = null

const Comment = ({productId, variant, variantId, orderId}) => {
    const ref = useRef()
    const refComment = useRef()
    const refCommentList = useRef()

    const {isLoggedIn} = useSelector(state => state.user)
    const navigate = useNavigate()

    const [selected, setSelected] = useState(filterReview[0].id)
    const [comment, setComment] = useState('')
    const [infoSummary, setInfoSummary] = useState(null)
    const [ratingList, setRatingList] = useState(null)
    const [voteSelected, setVoteSelected] = useState(0)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxpage] = useState(0)
    const [isBlink, setIsBlink] = useState(-1)
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadFirst, setIsLoadFirst] = useState(true)
    const [imgHover, setImgHover] = useState(null)

    const {current} = useSelector(state => state.app)
    
    const fetchRatings = async(query) => {
        if(productId){
            const res = await getVoting(query)
            if(res?.success){
                setRatingList(res.data)
                setMaxpage(Math.ceil(res.data.maxPage/6))
            }
        } 
    }

    const fetchInfoSummary = async() => {
        if(productId){
            const res = await getInfoVoteSummary({voteForProduct: productId})
            if(res.success) setInfoSummary(res.data)
            console.log('check res:', res);
        }
    }

    useEffect(() => {
        const {key, value} = filterReview[selected - 1]
        if(page !== 0) setPage(0)
        fetchRatings({[key]: value, voteForProduct: productId, page: 0})
        isLoadFirst && fetchInfoSummary()
    }, [productId, selected])

    useEffect(() => {
        if(!isLoadFirst){
            const {key, value} = filterReview[selected - 1]
            fetchRatings({[key]: value, voteForProduct: productId, page})
            refCommentList.current.scrollIntoView({block: 'start', behavior: 'smooth'})
        }
    }, [page])

    useEffect(() => {
        if(isBlink > 0){
             timeout = setTimeout(() => {
                setIsBlink(prev => prev - 1)
                ref.current.className = 'animate-blink border-2 rounded-md'
            }, 500);
        }
        else if(isBlink === 0){
            ref.current.className = 'border-2 border-[#ff0000] rounded-md'
        }
        return () => clearTimeout(timeout)
    }, [isBlink])

    // className={isBlink > 0 ? 'animate-blink border-2 rounded-md' : (isBlink === 0 && 'border-2 border-[#ff0000] rounded-md')}
    return (
        <div ref={refComment} className='p-5 rounded-md shadow-lg bg-[#eef2f4]'>
            {/* Form vote and comment product */}
            <div className='bg-white px-3 py-4 rounded-md'>
                <h1 className='text-center text-2xl font-semibold mt-3 mb-3'></h1>
                <div className='rounded-md' ref={ref} onClick={() => ref.current.className = 'rounded-md'}>
                    {Array.from({ length: 5 }, (x, i) => i).map((e, index) => (
                        <div key={index} onClick={() => setVoteSelected(e + 1)} className={'rounded-md overflow-hidden'} >
                            <Votebar value={index} voted={infoSummary?.countStar[index]} totalVote={infoSummary?.totalVote}/>
                        </div>
                    ))}
                </div>
            </div>
            
             {/* Buttons to filter list comment */}
            <div ref={refCommentList} className='py-4'>
                <h1 className='text-2xl font-bold'>Review</h1>
                <div className='bg-[#d4e7f6] p-5 rounded-md mt-3 flex gap-x-5'>
                    <div className='min-w-fit'>
                        <h1 className='text-main font-semibold text-3xl'><span>{infoSummary?.averageVote} / </span>5 <span className='text-base text-gray-800'>({infoSummary?.totalVote} Voted)</span></h1>
                        <Rating rating={infoSummary?.averageVote} />
                    </div>
                    <div className='flex gap-4 flex-wrap'>
                        {filterReview?.map((item) => (
                            <div onClick={() => {setSelected(item.id); isLoadFirst && setIsLoadFirst(false)}} key={item.id} className={'h-fit py-2 px-4 border-[1px] cursor-pointer bg-white text-gray-600 rounded text-nowrap ' + (selected === item.id ? 'border-[#5badec] text-main' : 'border-gray-400')}>
                                <h1>{item.text} {item.key === 'star' && `(${infoSummary?.countStar[item.value - 1]})`}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Render list rating / comment */}
            <div>
                {ratingList?.voteList?.map((item, index, arr) => (
                    <VotedList key={item._id} voteData={item} isBorder={index < arr.length - 1}/>
                ))}
                {ratingList?.voteList?.length === 0 && <h1 className='text-center'>There are no reviews yet</h1>}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next >'
                onPageChange={(e) => {setPage(e.selected); isLoadFirst && setIsLoadFirst(false)}}
                pageRangeDisplayed={5}
                pageCount={maxPage}
                forcePage={page}
                previousLabel="< Prev"
                renderOnZeroPageCount={null}
                previousClassName="rounded-md hover:bg-gray-100 hover:text-main"
                previousLinkClassName="px-4 py-2 block"
                pageClassName="text-gray-500 rounded-full hover:bg-gray-100 hover:text-main"
                pageLinkClassName="px-4 py-2 block"
                nextClassName="rounded-md hover:bg-gray-100 hover:text-main"
                nextLinkClassName="px-4 py-2 block"
                containerClassName="flex items-center w-fit mt-10 mx-auto"
                activeClassName="bg-main rounded-full shadow-lg text-white hover:bg-main hover:text-white"
            />
        </div>
    )
}

export default memo(Comment)