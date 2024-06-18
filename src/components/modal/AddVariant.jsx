import React, { useEffect, useState } from 'react'
import TitleText from '../style/TitleText'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { addVariant, updateProduct } from '../../apis'
import { toast } from 'react-toastify'
import { forEach } from 'lodash'
import ButtonLoading from '../style/ButtonLoading'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const AddVariant = ({product, setShowModal, setCurrent, title}) => {
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [messageImg, setMessageImg] = useState('')


    const watchFields = watch();

    const setDefaultValue = () => {
       
    }

    useEffect(() => {
        // setDefaultValue()
    }, [])

    const onSubmit = async(data) => {
        if(!thumbnail){
            setMessageImg('Please upload file thumbnail!')
        }
        const form = new FormData()
        form.append('_id', product._id)
        data['thumbnail'] = thumbnail
        Object.entries(data).forEach(([key, value]) => value && form.append(key, value))
        for (var pair of form.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        setIsLoading(true)
        const res = await addVariant(form)
        setIsLoading(false)
        if(res.success){
            toast.success(res.message)
            setShowModal(false)
            // handleRefresh()
        }else{
            toast.error(res.message)
        }
    }

    const handleUploadThumbnail = (e) => {
        if(e.target.files[0]){
            setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
            setThumbnail(e.target.files[0])
            setMessageImg('')
        }
    }

    return (
        <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit my-10 mx-auto max-w-screen-lg">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl min-w-[600px] relative flex flex-col bg-white outline-none focus:outline-none animate-slide-in-blurred-top">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-xl text-red-500 font-semibold">{title}</h3>
                        <div className=''>
                            <button disabled={isLoading} onClick={() => setDefaultValue()} className={`px-5 py-3 mr-5 bg-main rounded-md text-white ${isLoading && 'opacity-80'}`}>
                                <i className="fa-solid fa-arrows-rotate mr-3"></i>
                                Reset
                            </button>
                            <button disabled={isLoading} onClick={() => {setShowModal(false);}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative p-6 flex flex-auto text-black">
                            <div className='w-[80%]'>
                                <div className='grid grid-cols-2 gap-x-5 mb-5'>
                                    <div className=''>
                                        <label htmlFor="">Type variant:</label>
                                        <input className={classInput} placeholder="Color" {...register("variantType", { required: 'This input is required' })} />
                                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="">Name:</label>
                                        <input type='text' placeholder='Black' className={classInput} {...register("name", { required: 'This input is required' })} />
                                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-5 mb-5'>
                                    <div>
                                        <label htmlFor="">Price:</label>
                                        <input type='number' className={classInput} {...register("price", { required: 'This input is required', min: { value: 0, message: 'Price must be > 0' } })} />
                                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex-auto'>
                                <div>
                                    <label htmlFor="product-thumbnail">Upload thumbnail:
                                        <div className='mt-3 border bg-gray-50 rounded-md h-[250px] flex items-center justify-center'>
                                            {thumbnailUrl ?
                                                <img src={thumbnailUrl} className='h-full w-full object-cover cursor-pointer' />
                                                :
                                                <div className='rounded-full px-3 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                                    <i className="fa-solid fa-upload"></i><br />
                                                    Upload thumbnail
                                                </div>
                                            }
                                        </div>
                                    </label>
                                    <input onChange={e => handleUploadThumbnail(e)} hidden id='product-thumbnail' type="file" />
                                    {messageImg && <span className={classError}>{messageImg}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-3 px-4 py-3 justify-end border-t border-solid rounded-b">
                            <button
                                disabled={isLoading}
                                className={`border-2 border-red-500 text-red-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 ${isLoading ? 'opacity-90' : 'hover:text-white hover:bg-red-500'}`}
                                type="button"
                                onClick={() => {setShowModal(false);}}
                            >
                                Close
                            </button>
                            <ButtonLoading isLoading={isLoading} text='Create variant' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddVariant