import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonLoading from '../../components/style/ButtonLoading'
import { toast } from 'react-toastify'
import { changePassword } from '../../apis/user'
import InputFields from '../../components/InputFields'
import TitleText from '../../components/style/TitleText'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'
const classLabel = 'text-main mt-5 inline-block'

const message = 'Must be least 8 character Include least 1 character: number, uppercase, lowercase, special'

const ChangePassword = () => {
    const [data, setData] = useState({oldPassword: '', newPassword: '', confirmNewPassword: ''})
    const [invalid, setInvalid] = useState({oldPassword: '', newPassword: '', confirmNewPassword: ''})

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async() => {
        const {oldPassword, newPassword, confirmNewPassword} = data
        const fieldCheck = ['oldPassword', 'newPassword', 'confirmNewPassword']
        let check = true
        for(let field of fieldCheck){
            if(data[field].trim().length === 0){
                setInvalid(prev => ({...prev, [field]: 'This field is required!'}))
                check = false
            }
        }
        if(!check) return
        if(oldPassword === newPassword){
            setInvalid(prev => ({...prev, newPassword: 'The new password must be different from the current password!'}))
            return
        }
        if(newPassword !== confirmNewPassword){
            setInvalid(prev => ({...prev, confirmNewPassword: 'New password isn\'t the same confirm new password!'}))
            return
        }
        const res = await changePassword(data)
        if(res.success){
            toast.success(res.message)
        }
        else{
            toast.error(res.message)
        }
        setData({oldPassword: '', newPassword: '', confirmNewPassword: ''})
    }

    return (
        <div>
            <TitleText text={'Change Password'} size={'text-3xl'}/>
            <div className='grid grid-cols-1 gap-y-6 w-1/2'>
                <InputFields name='oldPassword' value={data} setValue={setData} invalid={invalid} setInvalid={setInvalid} placeHolder={'Current password'} isPassword={true} type='password'/>
                <InputFields name='newPassword' value={data} setValue={setData} invalid={invalid} setInvalid={setInvalid} placeHolder={'New password'} isPassword={true} type='password'/>
                <InputFields name='confirmNewPassword' value={data} setValue={setData} invalid={invalid} setInvalid={setInvalid} placeHolder={'Confirm new password'} isPassword={true} type='password'/>
            </div>
            <div className='mx-auto mt-20 flex items-center gap-x-5'>
                <div className='flex-auto h-[1px] bg-gray-200'></div>
                <ButtonLoading handleClick={handleSubmit} text={'Update'} isLoading={isLoading} />
                <div className='flex-auto h-[1px] bg-gray-200'></div>
            </div>
        </div>
    )
}

export default ChangePassword