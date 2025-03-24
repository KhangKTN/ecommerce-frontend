import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { postRating } from '../../apis/product'
import { Rating } from '../product'
import ButtonLoading from '../ui/ButtonLoading'

const FormComment = ({ data, reload }) => {
    const refForm = useRef()

    const [star, setStar] = useState(0)
    const [comment, setComment] = useState('')
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [imgHover, setImgHover] = useState(null)

    useEffect(() => {
        refForm.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [data])

    const handleUploadImage = (e) => {
        const { files } = e.target
        if (files.length === 0) return
        if (files?.length + images.length > 4) {
            toast.error('You only can add total 4 images!')
            return
        }
        setImages((prev) => [...prev, ...files])
        setPreviewImg((prev) => [...prev, ...[...files].map((file) => URL.createObjectURL(file))])
    }

    const handlePostComment = useCallback(async () => {
        if (star === 0) {
            toast.error('Please rating star!')
            return
        }
        const dataVote = { ...data, comment, star }
        console.log(dataVote)
        const form = new FormData()
        Object.entries(dataVote).forEach(([key, value]) => form.append(key, value))
        if (images) {
            images.forEach((img) => form.append('images', img))
        }
        setIsLoading(true)
        const res = await postRating(form)
        setIsLoading(false)
        if (res.success) {
            toast.success(res.message)
            setComment('')
            setImages(null)
            setPreviewImg(null)
            setStar(0)
            reload()
        } else {
            toast.error(res.message)
        }
    }, [star, comment])

    const handleDeleteImage = (index) => {
        const copyImages = images.filter((item, idx) => idx !== index)
        const copyPreviewImg = previewImg.filter((item, idx) => idx !== index)
        setImages(copyImages)
        setPreviewImg(copyPreviewImg)
    }

    return (
        <div ref={refForm} className='rounded-md bg-gray-50 mt-5 py-5 px-10 flex flex-col w-1/2 mx-auto'>
            <div className='w-fit mx-auto mb-3'>
                <Rating rating={star} setStar={setStar} size={'size-8'} />
            </div>
            <div className='flex flex-col gap-y-5'>
                <div className='basis-2/5'>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className='w-full border-[1px] border-gray-300 bg-gray-100 rounded-md px-5 py-2 resize-none focus:outline-sky-500 h-[100px]'
                        placeholder='Type something...'
                        id='comment'
                        rows='5'
                    ></textarea>
                </div>
                <div className='basis-3/5'>
                    <div className='text-right'>
                        <span
                            onClick={() => {
                                setImages([])
                                setPreviewImg([])
                            }}
                            className='cursor-pointer hover:text-red-500 hover:underline font-medium'
                        >
                            Reset photos
                        </span>
                    </div>
                    {images?.length > 0 ? (
                        <div className='grid grid-cols-4 gap-3'>
                            {previewImg?.map((e, index) => (
                                <div
                                    key={e}
                                    onMouseEnter={() => setImgHover(index)}
                                    onMouseLeave={() => setImgHover(null)}
                                    className='relative'
                                >
                                    <img className='object-cover w-full h-[100px] rounded' src={e} alt='' />
                                    {imgHover === index && (
                                        <button
                                            onClick={() => handleDeleteImage(index)}
                                            className='absolute flex items-center justify-center top-1 right-1 bg-[#ffffff45] backdrop-blur-md size-8 rounded-full hover:text-white hover:bg-red-500 transition-all duration-300'
                                        >
                                            <i className='fa-solid fa-xmark'></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            {images.length < 4 && (
                                <div className='border-[1px] border-dashed border-main rounded-md h-[100px] flex items-center justify-center'>
                                    <label
                                        htmlFor='uploadFile'
                                        className='bg-main size-10 rounded-full flex items-center justify-center text-white cursor-pointer'
                                    >
                                        <i className='fa-solid fa-plus'></i>
                                    </label>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='bg-gray-100 border-[1px] border-gray-300 w-full h-[120px] rounded-md'>
                            <label
                                className='font-semibold text-lg cursor-pointer flex flex-col justify-center'
                                htmlFor='uploadFile'
                            >
                                <img
                                    className='object-cover size-[80px] mx-auto'
                                    src='https://icons.veryicon.com/png/o/miscellaneous/linear/camera-265.png'
                                    alt=''
                                />
                                <span className='text-sm text-center text-gray-500'>
                                    Add descriptive images to your products <br />
                                    (Upload maximum 4 images)
                                </span>
                            </label>
                        </div>
                    )}
                    <input
                        onChange={(e) => handleUploadImage(e)}
                        hidden
                        id='uploadFile'
                        type='file'
                        multiple={true}
                        max={4}
                    />
                </div>
            </div>
            <div className='w-fit mx-auto mt-5'>
                <ButtonLoading text='Vote now' isLoading={isLoading} handleClick={handlePostComment} />
            </div>
        </div>
    )
}

export default FormComment
