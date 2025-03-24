import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateProduct } from '../../apis'
import { ButtonLoading } from '../../components/ui'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const UpdateProduct = ({title, setShowModal, product, handleRefresh}) => {
    const {categories} = useSelector(state => state.app)
    const [listAttribute, setListAttribute] = useState([])
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [images, setImages] = useState([])
    const [imageUrl, setImageUrl] = useState([])

    const watchFields = watch();

    const setDefaultValue = () => {
        console.log('check product:', product);
        setValue('name', product?.name)
        setValue('category', product?.category)
        setValue('price', product?.price)
        setValue('brand', product?.brand)
        setValue('quantity', product?.quantity)
        setThumbnailUrl(product?.thumbnail)
        setImageUrl(product?.image)
        setListAttribute(product?.description.map((item, index) => ({id: index + 1, data: item})))
    }

    useEffect(() => {
        setDefaultValue()
    }, [])

    const onSubmit = async(data) => {
        data['description'] = listAttribute.reduce((list, item) => item.data.length !== 0 ? [...list, item.data.replaceAll(',', '_')] : list, [])
        data['thumbnail'] = thumbnail
        const form = new FormData()
        Object.entries(data).forEach(([key, value]) => value && form.append(key, value))
        if(images){
            images.forEach(img => form.append('images', img))
        }
        form.append('_id', product._id)
        setIsLoading(true)
        const res = await updateProduct(form)
        setIsLoading(false)
        if(res.success){
            toast.success(res.message)
            setShowModal(false)
            handleRefresh()
        }else{
            toast.error(res.message)
        }
    }

    const handleAdd = () => {
        const list = [...listAttribute]
        list.push({id: listAttribute.length + 1, data: ''})
        setListAttribute(list)
    }

    const handleRemove = (id) => {
        console.log(id);
        const list = listAttribute.filter(item => item.id !== id)
        setListAttribute(list)
    }

    const handleChange = (id, data) => {
        const list = [...listAttribute]
        list[id - 1].data = data
        setListAttribute(list)
    }

    const handleUploadThumbnail = (e) => {
        if(e.target.files[0]){
            setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
            setThumbnail(e.target.files[0])
        }
    }

    const handleUploadImages = (e) => {
        // console.log(e.target.files);
        const {files} = e.target
        if(files.length > 4){
            toast.error('You can only upload a maximum of 4 photos')
            return
        }
        if(files.length > 0){
            setImageUrl([...e.target.files].map(img => URL.createObjectURL(img)))
            setImages([...e.target.files])
        }
    }

    return (
        <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit py-10 mx-auto max-w-screen-lg">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl relative flex flex-col bg-white outline-none focus:outline-none animate-slide-in-top">
                    <div className="flex items-center h-[72px] justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
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
                        <div className="relative p-6 flex-auto text-black overflow-auto max-h-[calc(100vh-80px-72px*2)]">
                                <div className='grid grid-cols-2 gap-x-5 mb-5'>
                                    <div>
                                        <label htmlFor="">Name product:</label>
                                        <input className={classInput} placeholder="Iphone 15 Pro Max" {...register("name", {required: 'This input is required'})}/>
                                        {watchFields['name'] !== product?.name && <span className={`text-main mt-2 inline-block`}>Modified <i className="fa-solid fa-check"></i></span>}
                                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="">Category:</label>
                                        <select className={classInput} {...register('category')}>
                                            {categories?.map((item, index) => (
                                                <option selected={index === 0} key={item._id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                        {watchFields['category'] !== product?.category && <p className={`text-main mt-2 inline-block`}>Modified <i className="fa-solid fa-check"></i></p>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 gap-x-5 mb-5'>
                                    <div>
                                        <label htmlFor="">Price:</label>
                                        <input type='number' className={classInput} {...register("price", {min: {value: 0, message: 'Price must be > 0'}})} />
                                        {watchFields['price'] != product?.price && <p className={`text-main mt-2 inline-block`}>Modified <i className="fa-solid fa-check"></i></p>}
                                        {errors.price && <span className={classError}>{errors.price.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="">Brand:</label>
                                        <select className={classInput} {...register('brand')}>
                                            <option value="samsung">Samsung</option>
                                            <option value="apple">Apple</option>
                                            <option value="abc">ABC</option>
                                        </select>
                                        {watchFields['brand'] !== product?.brand && <span className={`text-main mt-2 inline-block`}>Modified <i className="fa-solid fa-check"></i></span>}
                                    </div>
                                    <div>
                                        <label htmlFor="">Quantity:</label>
                                        <input type='number' className={classInput} {...register("quantity", {required: 'This input is required', min: {value: 0, message: 'Price must be >= 0'}})} />
                                        {watchFields['quantity'] != product?.quantity && <span className={`text-main mt-2 inline-block`}>Modified <i className="fa-solid fa-check"></i></span>}
                                        {errors.quantity && <span className={classError}>{errors.quantity.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-5 mb-5'>
                                    <div>
                                        <div>
                                            <label htmlFor="product-thumbnail">Upload thumbnail:
                                                <div className='mt-3 border bg-gray-50 rounded-md h-[250px] flex items-center justify-center'>
                                                    {thumbnailUrl ?
                                                        <img src={thumbnailUrl} className='h-full w-full object-contain cursor-pointer'/>
                                                    :
                                                        <div className='rounded-full px-3 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                                            <i className="fa-solid fa-upload"></i><br />
                                                            Upload thumbnail
                                                        </div>
                                                    }
                                                </div>
                                            </label>
                                            <input onChange={e => handleUploadThumbnail(e)} hidden id='product-thumbnail' type="file"/>
                                        </div>
                                        <div className='mt-5'>
                                            <label htmlFor="product-image">Upload images:
                                                <div className='mt-3 border min-h-[250px] bg-gray-50 rounded-md h-auto flex items-center justify-center'>
                                                    {imageUrl.length > 0 ?
                                                        <div className='h-full w-full grid grid-cols-2 gap-2 cursor-pointer'>
                                                            {imageUrl.map(item => (
                                                                <img src={item} className='h-[120px] w-full object-contain rounded-md border' alt=''/>
                                                            ))}
                                                        </div>
                                                    :
                                                        <div className='rounded-full px-3 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                                            <i className="fa-solid fa-upload"></i><br />
                                                            Upload images
                                                        </div>
                                                    }
                                                </div>
                                            </label>
                                            <input onChange={e => handleUploadImages(e)} hidden id='product-image' multiple type="file"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Attibute:</label>
                                        <div className=''>
                                        {listAttribute?.map((item, index) => (
                                            <div className='flex gap-x-3 mb-3'>
                                                <input type="text" className={`w-[75%] ` + classInput} onChange={(e) => handleChange(item.id, e.target.value)} value={item.data} placeholder='Weight: 500g'/>
                                                {index === listAttribute.length - 1 && <button onClick={() => handleAdd()} type='button' className='bg-green-500 px-[14px] mt-3 rounded-full text-white'><i className="fa-solid fa-plus"></i></button>}
                                                {listAttribute.length !== 1 && <button onClick={() => handleRemove(item.id)} type='button' className='bg-red-500 px-[15px] mt-3 rounded-full text-white'><i className="fa-solid fa-xmark"></i></button>}
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="h-[72px] flex items-center gap-x-3 px-4 py-3 justify-end border-t border-solid rounded-b">
                            <button
                                disabled={isLoading}
                                className={`border-2 border-red-500 text-red-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 ${isLoading ? 'opacity-90' : 'hover:text-white hover:bg-red-500'}`}
                                type="button"
                                onClick={() => {setShowModal(false);}}
                            >
                                Close
                            </button>
                            <ButtonLoading isLoading={isLoading} text='Update product' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct
