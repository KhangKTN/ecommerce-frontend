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

const Comment = ({productId}) => {
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

    const handleUploadImage = (e) => {
        const {files} = e.target
        if(files.length === 0) return
        if(files?.length + images.length > 4){
            toast.error('You only can add total 4 images!')
            return
        }
        setImages(prev => [...prev, ...files])
        setPreviewImg(prev => [...prev, ...[...files].map(file => URL.createObjectURL(file))])
    }

    const handlePostComment = useCallback(async() => {
        refComment.current.scrollIntoView({behavior: "smooth", block: "start"})
        if(!isLoggedIn){
            navigate(`/${path.LOGIN}`)
            toast.info('Please login to continue vote!')
            return
        }
        if(voteSelected === 0){
            toast.error('Please rating star!')
            setIsBlink(5)
            return
        }
        const dataVote = {star: voteSelected, comment, productId}
        const form = new FormData()
        Object.entries(dataVote).forEach(([key, value]) => form.append(key, value))
        // console.log(images);
        if(images){
            images.forEach(img => form.append('images', img))
        }
        // console.log('check dataVote:', dataVote);
        setIsLoading(true)
        const res = await postRating(form)
        setIsLoading(false)
        if(res.success){
            toast.success(res.message)
            setComment('')
            setImages(null)
            setPreviewImg(null)
            setVoteSelected(0)
            fetchRatings()
        }else{
            toast.error(res.message)
        }
    }, [voteSelected, comment])

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
                <h1 className='text-center text-2xl font-semibold mt-3 mb-3'>Please write your review below</h1>
                <div className='rounded-md' ref={ref} onClick={() => ref.current.className = 'rounded-md'}>
                    {Array.from({ length: 5 }, (x, i) => i).map((e, index) => (
                        <div key={index} onClick={() => setVoteSelected(e + 1)} className={'rounded-md overflow-hidden ' + (voteSelected === e + 1 ? 'bg-[#d5e7f6]' : '')} >
                            <Votebar value={index} voted={ratingList?.rating?.filter(el => el.star === e + 1).length} totalVote={ratingList?.rating?.length}/>
                        </div>
                    ))}
                </div>
                <div className='flex gap-x-5 mt-4 px-5'>
                    <div className='basis-2/5'>
                        <label className='font-semibold text-lg' htmlFor="comment">Comment:</label>
                        <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='w-full border-[1px] border-gray-300 bg-gray-100 rounded-md px-5 py-2 resize-none focus:outline-sky-500 h-[100px]' placeholder='Type something...' id="comment" rows="5"></textarea>
                    </div>
                    <div className='basis-3/5'>
                        <div className='flex justify-between'>
                            <label className='font-semibold text-lg'>Add photos:</label>
                            <span onClick={() => {setImages([]); setPreviewImg([])}} className='text-right cursor-pointer hover:text-red-500 underline'>Reset photos</span>
                        </div>
                        {images.length > 0 ?
                            <div className='grid grid-cols-4 gap-3'>
                                {previewImg?.map((e, index) => 
                                    <div key={e} onMouseEnter={() => setImgHover(index)} onMouseLeave={() => setImgHover(null)} className='relative'>
                                        <img className='object-cover w-full h-[100px] rounded' src={e} alt="" />
                                        {imgHover === index && <button className='absolute flex items-center justify-center top-1 right-1 bg-[#ffffff45] backdrop-blur-md size-8 rounded-full hover:text-white hover:bg-red-500 transition-all duration-300'><i className="fa-solid fa-xmark"></i></button>}
                                    </div>
                                )}
                                {images.length < 4 && 
                                    <div className='border-[1px] border-dashed border-main rounded-md h-[100px] flex items-center justify-center'>
                                        <label htmlFor='uploadFile' className='bg-main size-10 rounded-full flex items-center justify-center text-white cursor-pointer'><i className="fa-solid fa-plus"></i></label>
                                    </div>
                                }
                            </div>
                        : 
                            <div className='bg-gray-100 border-[1px] border-gray-300 w-full h-[100px] rounded-md'>
                                <label className='font-semibold text-lg cursor-pointer flex flex-col justify-center' htmlFor="uploadFile">
                                    <img className='object-cover size-[80px] mx-auto' src="https://icons.veryicon.com/png/o/miscellaneous/linear/camera-265.png" alt="" />
                                    <span className='text-sm text-center font-light'>Add descriptive images to your products</span>
                                </label>
                            </div> 
                        }
                        <input onChange={e => handleUploadImage(e)} hidden id='uploadFile' type="file" multiple={true} max={4}/>
                    </div>
                </div>
                <div className='w-fit mx-auto mt-5'>
                    <ButtonLoading text='Vote now' isLoading={isLoading} handleClick={handlePostComment}/>
                </div>
            </div>
            
             {/* Buttons to filter list comment */}
            <div ref={refCommentList} className='py-4'>
                <h1 className='text-2xl font-bold'>Review</h1>
                <div className='bg-[#d4e7f6] p-5 rounded-md mt-3 flex gap-x-5'>
                    <div>
                        <h1 className='text-main font-semibold text-3xl'><span>{infoSummary?.averageVote} / </span>5 <span className='text-sm text-gray-800'>({infoSummary?.totalVote} Voted)</span></h1>
                        <Rating rating={infoSummary?.averageVote} />
                    </div>
                    <div className='flex gap-x-4'>
                        {filterReview?.map((item) => (
                            <div onClick={() => {setSelected(item.id); isLoadFirst && setIsLoadFirst(false)}} key={item.id} className={'h-fit py-2 px-5 border-[1px] cursor-pointer bg-white text-gray-500 rounded-md ' + (selected === item.id ? 'border-[#5badec] text-main' : 'border-gray-400')}>
                                <h1>{item.text}</h1>
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