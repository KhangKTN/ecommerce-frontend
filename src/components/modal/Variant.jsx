import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addVariant, deleteVariant, getProductDetail } from '../../apis'
import ButtonLoading from '../ui/ButtonLoading'

const classInput =
    'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const Varient = ({ product, setShowModal, setCurrent, title, handleRefresh }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const [variant, setVariant] = useState(product.variant)
    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [messageImg, setMessageImg] = useState('')

    const [isShowForm, setIsShowForm] = useState(false)

    const setDefaultValue = () => {
        reset()
        setThumbnail(null)
        setThumbnailUrl(null)
    }

    const fetchDataProduct = async () => {
        const res = await getProductDetail(product?._id)
        if (res.success) setVariant(res.data?.variant)
    }

    useEffect(() => {}, [product])

    const onSubmit = async (data) => {
        if (!thumbnail) {
            setMessageImg('Please upload file thumbnail!')
            return
        }
        const form = new FormData()
        form.append('_id', product._id)
        data['thumbnail'] = thumbnail
        Object.entries(data).forEach(([key, value]) => value && form.append(key, value))
        for (var pair of form.entries()) {
            console.log(pair[0] + ': ' + pair[1])
        }
        setIsLoading(true)
        const res = await addVariant(form)
        setIsLoading(false)
        console.log('check res add variant:', res)
        if (res.success) {
            toast.success(res.message)
            fetchDataProduct()
            setDefaultValue()
            handleRefresh()
        } else {
            toast.error(res.message)
        }
    }

    const handleUploadThumbnail = (e) => {
        if (e.target.files[0]) {
            setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
            setThumbnail(e.target.files[0])
            setMessageImg('')
        }
    }

    const handleDeletevariant = async (variant) => {
        const res = await deleteVariant({ productId: product._id, variantId: variant._id, quantity: variant.quantity })
        console.log(res.data)
        if (res.success) {
            toast.success(res.message)
            setVariant(res.data.variant)
            fetchDataProduct()
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className='flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm'>
            <div className='relative w-auto h-fit mx-auto my-10 max-w-screen-lg'>
                <div className='border-[2px] border-gray-400 rounded-xl shadow-xl min-w-[600px] relative flex flex-col bg-white outline-none focus:outline-none animate-slide-in-blurred-top'>
                    <div className='flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t '>
                        <h3 className='text-xl text-red-500 font-semibold'>{title}</h3>
                        <div className=''>
                            <button
                                disabled={isLoading}
                                onClick={() => setDefaultValue()}
                                className={`px-5 py-2 mr-5 bg-main rounded-md text-white ${isLoading && 'opacity-80'}`}
                            >
                                <i className='fa-solid fa-arrows-rotate mr-3'></i>
                                Reset
                            </button>
                            <button
                                disabled={isLoading}
                                onClick={() => {
                                    setShowModal(false)
                                }}
                                type='button'
                                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <svg
                                    className='w-3 h-3'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 14'
                                >
                                    <path
                                        stroke='currentColor'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='3'
                                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                    />
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                        </div>
                    </div>
                    <div className='overflow-auto max-h-[calc(100vh-80px-72px)]'>
                        {variant.length > 0 &&
                            variant.map((item, index, arr) => (
                                <div className={`relative px-6 mt-5 flex-auto text-black`}>
                                    <div className='grid grid-cols-5 items-center gap-x-5'>
                                        <div>
                                            <label htmlFor=''>Type variant:</label>
                                            <input
                                                disabled
                                                className={classInput}
                                                value={item?.variantType}
                                                placeholder='Color'
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor=''>Name:</label>
                                            <input
                                                disabled
                                                type='text'
                                                placeholder='Black'
                                                className={classInput}
                                                value={item?.name}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor=''>Price:</label>
                                            <input disabled type='number' className={classInput} value={item?.price} />
                                        </div>
                                        <div className=''>
                                            <img src={item?.thumbnail} alt='' />
                                        </div>
                                        <div className='flex gap-x-5 justify-center'>
                                            {/* <button className={'px-5 py-2 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'}><i className="fa-solid fa-file-pen"></i></button> */}
                                            <button
                                                onClick={() => handleDeletevariant(item)}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                                }
                                            >
                                                <i className='fa-regular fa-trash-can'></i>
                                            </button>
                                        </div>
                                    </div>
                                    {index !== arr.length - 1 && <div className='h-[1px] mt-5 bg-gray-200'></div>}
                                </div>
                            ))}
                        <div className='my-5 px-6'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex items-center gap-x-5 mb-3'>
                                    <div className='h-[1px] flex-auto bg-gray-300'></div>
                                    <button
                                        disabled={isLoading}
                                        className={`border-2 min-w-[120px] border-gray-500 block text-gray-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 ${
                                            isLoading ? 'opacity-90' : 'hover:text-white hover:bg-gray-500'
                                        }`}
                                        type='button'
                                        onClick={() => setIsShowForm(!isShowForm)}
                                    >
                                        {isShowForm ? 'Closappe' : 'Add new variant'}
                                    </button>
                                    {isShowForm && <ButtonLoading isLoading={isLoading} text='Save variant' />}
                                    <div className='h-[1px] flex-auto bg-gray-300'></div>
                                </div>
                                {isShowForm && (
                                    <div className='flex gap-x-5'>
                                        <div className='w-[80%] flex flex-col'>
                                            <div className='grid grid-cols-2 gap-x-5'>
                                                <div>
                                                    <label htmlFor=''>Type variant:</label>
                                                    <input
                                                        className={classInput}
                                                        placeholder='Color'
                                                        {...register('variantType', {
                                                            required: 'This input is required'
                                                        })}
                                                    />
                                                    {errors.variantType && (
                                                        <span className={classError}>{errors.variantType.message}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor=''>Name:</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Black'
                                                        className={classInput}
                                                        {...register('name', { required: 'This input is required' })}
                                                    />
                                                    {errors.name && (
                                                        <span className={classError}>{errors.name.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-x-5 mt-5'>
                                                <div>
                                                    <label htmlFor=''>Price:</label>
                                                    <input
                                                        type='number'
                                                        className={classInput}
                                                        {...register('price', {
                                                            required: 'This input is required',
                                                            min: { value: 0, message: 'Price must be > 0' }
                                                        })}
                                                    />
                                                    {errors.price && (
                                                        <span className={classError}>{errors.price.message}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor=''>Quantity:</label>
                                                    <input
                                                        type='number'
                                                        className={classInput}
                                                        {...register('quantity', {
                                                            required: 'This input is required',
                                                            min: { value: 0, message: 'Price must be > 0' }
                                                        })}
                                                    />
                                                    {errors.quantity && (
                                                        <span className={classError}>{errors.quantity.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-auto'>
                                            <div>
                                                <label htmlFor='product-thumbnail'>
                                                    Upload thumbnail:
                                                    <div className='mt-3 border bg-gray-50 rounded-md h-[250px] flex items-center justify-center'>
                                                        {thumbnailUrl ? (
                                                            <img
                                                                src={thumbnailUrl}
                                                                className='h-full w-full object-cover cursor-pointer'
                                                                alt=''
                                                            />
                                                        ) : (
                                                            <div className='rounded-full px-3 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                                                <i className='fa-solid fa-upload'></i>
                                                                <br />
                                                                Upload thumbnail
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => handleUploadThumbnail(e)}
                                                    hidden
                                                    id='product-thumbnail'
                                                    type='file'
                                                />
                                                {messageImg && <span className={classError}>{messageImg}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Varient
