import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../apis'
import { getCurrentUser } from '../../app/actions/userAction'
import { ButtonLoading, TitleText } from '../../components/ui'

const classInput =
    'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5'
const classError = 'text-red-500'
const classLabel = 'font-semibold'

const PersonalInfo = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm()

    const { current } = useSelector((state) => state.user)
    const [dataUser, setDataUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatcher = useDispatch()

    useEffect(() => {
        if (current) {
            setDataUser(current)
            reset({ firstname: current?.firstname, lastname: current?.lastname })
            setAvatarUrl(current?.avatar)
        }
    }, [current])

    const submitForm = async (data) => {
        if (avatar) data['avatar'] = avatar
        const form = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            form.append(key, value)
        })
        setIsLoading(true)
        const res = await updateUser(form)
        setIsLoading(false)
        if (res.success) {
            toast.success(res.message)
            reset()
            setAvatar(null)
            setAvatarUrl(null)
            dispatcher(getCurrentUser())
        } else toast.error(res.message)
    }

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            setAvatar(e.target.files[0])
        }
    }

    const checkChangedForm = () => {
        // Check form hook changed
        if (isDirty) return true
        // Check avatar changed
        if (avatar) return true
    }

    return (
        <div>
            <TitleText text={'My profile'} size={'text-3xl'} />
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='grid grid-cols-2 gap-x-5 items-center'>
                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <label className={classLabel} htmlFor=''>
                                First name:
                            </label>
                            <input
                                className={classInput}
                                {...register('firstname', { required: 'This input is required' })}
                            />
                            {errors.firstname && <span className={classError}>{errors.firstname.message}</span>}
                        </div>
                        <div>
                            <label className={classLabel} htmlFor=''>
                                Last name:
                            </label>
                            <input
                                className={classInput}
                                {...register('lastname', { required: 'This input is required' })}
                            />
                            {errors.lastname && <span className={classError}>{errors.lastname.message}</span>}
                        </div>
                        <div>
                            <label className={classLabel} htmlFor=''>
                                Email:{' '}
                            </label>
                            <span className='ml-10'>{current?.email}</span>
                        </div>
                        <div>
                            <label className={classLabel} htmlFor=''>
                                Mobile:{' '}
                            </label>
                            <span className='ml-10'>{current?.mobile}</span>
                        </div>
                    </div>
                    <div className=''>
                        <div className='border p-4 rounded-md'>
                            <img
                                src={
                                    avatarUrl
                                        ? avatarUrl
                                        : 'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?ssl=1'
                                }
                                className='size-24 mx-auto bg-transparent object-cover rounded-full border'
                                alt=''
                            />
                            <label htmlFor='avatar'>
                                <div className='rounded-xl mx-auto mt-3 px-5 py-2 bg-gray-100 text-main text-center w-fit hover:bg-gray-200 cursor-pointer'>
                                    <i className='fa-solid fa-upload'></i>
                                    <br />
                                    Upload avatar (.jpg, .png) <br />
                                    Up to 1MB
                                </div>
                            </label>
                            <input onChange={handleUpload} type='file' id='avatar' hidden />
                        </div>
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
