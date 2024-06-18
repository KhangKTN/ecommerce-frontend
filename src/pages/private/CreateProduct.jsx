import React, { useEffect, useState } from 'react'
import TitleText from '../../components/style/TitleText'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createProduct } from '../../apis'
import { toast } from 'react-toastify'
import { forEach } from 'lodash'
import ButtonLoading from '../../components/style/ButtonLoading'
import Tippy from '@tippyjs/react'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const CreateProduct = () => {
    const {categories} = useSelector(state => state.app)
    const [listAttribute, setListAttribute] = useState([{id: 1, data: ''}])
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [images, setImages] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    
    const onSubmit = async(data) => {
        data['description'] = listAttribute.reduce((list, item) => item.data.length !== 0 ? [...list, item.data] : list, [])
        if(data.description.length === 0) delete data['description']
        if(data['price']) data['price'] = data['price'].replace(/\D/g, '')
        data['thumbnail'] = thumbnail
        const form = new FormData()
        Object.entries(data).forEach(([key, value]) => form.append(key, value))
        for (var pair of form.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        if(images){
            images.forEach(img => form.append('images', img))
        }
        setIsLoading(true)
        const res = await createProduct(form)
        setIsLoading(false)
        if(res.success){
            toast.success(res.message)
            reset()
            setThumbnail(null)
            setThumbnailUrl(null)
            setImages([])
            setImageUrl([])
        }
        else toast.error(res.message)
    }

    const handleAdd = () => {
        const list = [...listAttribute]
        list.push({id: listAttribute.length + 1, data: ''})
        console.log(list);
        setListAttribute(list)
    }

    const handleRemove = (id) => {
        console.log(id);
        const list = listAttribute.filter(item => item.id !== id)
        console.log(list);
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
        <div>
            <TitleText text={'Create Product'}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-x-5 mb-5'>
                    <div>
                        <label htmlFor="">Name product:</label>
                        <input className={classInput} placeholder="Iphone 15 Pro Max" {...register("name", {required: 'This input is required'})}/>        
                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="">Category:</label>
                        <select className={classInput} {...register('category')}>
                            {categories?.map((item, index) => (
                                <option selected={index === 0} key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        {errors.name && <span className={classError}>{errors.name.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-x-5 mb-5'>
                    <div>
                        <label htmlFor="">Price:</label>
                        <input type='number' className={classInput} {...register("price", {required: 'This field is required!', min: {value: 0, message: 'Price must be > 0'}})} /> 
                        {errors.price && <span className={classError}>{errors.price.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="">Brand:</label>
                        <select className={classInput} {...register('brand')}>
                            <option value="samsung">Samsung</option>
                            <option value="apple">Apple</option>
                            <option value="abc">ABC</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Quantity:</label>
                        <input type='number' className={classInput} {...register("quantity", {required: 'This input is required', min: {value: 0, message: 'Price must be > 0'}})} />   
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
                                <div className='mt-3 border bg-gray-50 rounded-md h-[250px] flex items-center justify-center'>
                                    {imageUrl.length > 0 ? 
                                        <div className='h-full w-full grid grid-cols-2 gap-2 cursor-pointer'>
                                            {imageUrl.map(item => (
                                                <img src={item} className='h-[120px] w-full object-contain rounded-md border'/>
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
                                {index === listAttribute.length - 1 && <Tippy className='text-main' content={<span>Add attribute</span>}><button onClick={() => handleAdd()} type='button' className='bg-green-500 px-[14px] mt-3 rounded-full text-white'><i className="fa-solid fa-plus"></i></button></Tippy>}
                                {listAttribute.length !== 1 && <Tippy className='text-main' content={<span>Remove attribute</span>}><button onClick={() => handleRemove(item.id)} type='button' className='bg-red-500 px-[15px] mt-3 rounded-full text-white'><i className="fa-solid fa-xmark"></i></button></Tippy>} 
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className='mx-auto w-fit'>
                    <ButtonLoading isLoading={isLoading} text='Create product'/>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct