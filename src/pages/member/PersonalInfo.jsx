import React, { useEffect, useState } from 'react'
import TitleText from '../../components/style/TitleText'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {getInfoHiding} from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { updateUser } from '../../apis'
import { getCurrentUser } from '../../app/asyncActionUser'
import { toast } from 'react-toastify'
import _ from 'lodash'
import ButtonLoading from '../../components/style/ButtonLoading'
import Tippy from '@tippyjs/react'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'
const classLabel = 'text-main'

const PersonalInfo = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm()

    const {current} = useSelector(state => state.user)
    const [dataUser, setDataUser] = useState(null)
    const [listAddress, setListAddress] = useState([])
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatcher = useDispatch()

    useEffect(() => {
        if(current){
            setDataUser(current)
            reset({firstname: current?.firstname, lastname:current?.lastname})
            setListAddress(current?.address)
            setAvatarUrl(current?.avatar)
        }
    }, [current])

    const submitForm = async(data) => {
        if(avatar) data['avatar'] = avatar
        data['address'] = listAddress.reduce((list, item) => item.trim().length > 0 ? [...list, item.replaceAll(',', '_')] : list, [])
        const form = new FormData()
        Object.entries(data).forEach(([key, value]) => {form.append(key, value)})
        setIsLoading(true)
        const res = await updateUser(form)
        setIsLoading(false)
        if(res.success){
            toast.success(res.message)
            reset()
            setAvatar(null)
            setAvatarUrl(null)
            dispatcher(getCurrentUser())
        }
        else toast.error(res.message)
    }

    const handleAction = (action, addressIdx) => {
        if(action === 'remove'){
            setListAddress(prev => [...prev.filter((item, index) => index !== addressIdx)])
        }
        if(action === 'add'){
            const tempList = [...listAddress]
            tempList.push('')
            setListAddress(tempList)
        }
    }

    const handleUpload = (e) => {
        if(e.target.files[0]){
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            setAvatar(e.target.files[0])
        }
    }

    const handleOnChangeAddress = (value, index) => {
        const tempList = [...listAddress]
        tempList[index] = value
        setListAddress(tempList)
    }

    const checkChangedForm = () => {
        // Check form hook changed
        if(isDirty) return true
        // Check avatar changed
        if(avatar) return true
        // Check address
        return !_.isEqual(current?.address, listAddress)
    }

    return (
        <div>
            <TitleText text={'My profile'} size={'text-3xl'}/>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='grid grid-cols-2 gap-x-5'>
                    <div>
                        <label className={classLabel} htmlFor="">First name:</label>
                        <input className={classInput} {...register("firstname", { required: 'This input is required' })} />
                        {errors.firstname && <span className={classError}>{errors.firstname.message}</span>}
                    </div>
                    <div>
                        <label className={classLabel} htmlFor="">Last name:</label>
                        <input className={classInput} {...register("lastname", { required: 'This input is required' })} />
                        {errors.lastname && <span className={classError}>{errors.lastname.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-x-5 mt-5'>
                    <div>
                        <label className={classLabel} htmlFor="">Email: </label>
                        <span className='ml-10'>{current?.email}</span>
                    </div>
                    <div>
                        <label className={classLabel} htmlFor="">Mobile: </label>
                        <span className='ml-10'>{current?.mobile}</span>
                    </div>
                </div>
                <div className='mt-5 grid grid-cols-2 gap-x-5'>
                    <div>
                        <label className={classLabel} htmlFor="">Address:</label>
                        <div className='grid grid-cols-1 gap-x-5'>
                        <Tippy className='text-main' content={<span>Add address</span>}><button onClick={() => {handleAction('add')}} type='button' className='border-2 border-main text-main min-w-12 min-h-12 w-fit mx-auto mt-3 rounded-full hover:text-white hover:bg-main'><i className="fa-solid fa-add"></i></button></Tippy>
                            {listAddress?.map((item, index) => (
                                <div className='flex gap-x-3'>
                                    <input onChange={(e) => handleOnChangeAddress(e.target.value, index)} className={classInput} type="text" value={item}/>
                                    <Tippy className='text-red-500' content={<span>Remove</span>}><button onClick={() => {handleAction('remove', index)}} type='button' className='border-2 border-red-500 text-red-500 min-w-12 min-h-12 mt-3 rounded-full hover:text-white hover:bg-red-500'><i className="fa-solid fa-xmark"></i></button></Tippy>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='border p-4 rounded-md'>
                        <img src={avatarUrl ? avatarUrl : 'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?ssl=1'} className='size-24 mx-auto bg-transparent object-cover rounded-full border'/>
                        <label htmlFor='avatar'>
                            <div className='rounded-xl mx-auto mt-3 px-5 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                <i className="fa-solid fa-upload"></i><br />
                                Upload avatar (.jpg, .png) <br />
                                Up to 1MB
                            </div>
                        </label>
                        <input onChange={handleUpload} type="file" id='avatar'hidden/>
                    </div>
                </div>
                <div className='mx-auto mt-20 flex items-center gap-x-5'>
                    <div className='flex-auto h-[1px] bg-gray-200'></div>
                    <ButtonLoading text={'Update'} disabled={!checkChangedForm()} isLoading={isLoading} />
                    <div className='flex-auto h-[1px] bg-gray-200'></div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInfo