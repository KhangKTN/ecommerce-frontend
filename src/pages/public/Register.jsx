import { useCallback, useEffect, useState } from 'react'
import InputFields from "../../components/InputFields"
import { registerApi } from '../../apis/user'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import {register} from '../../app/userSlide'

const defaultObject = {firstname: '', lastname: '', email: '', mobile: '', password: '', repassword: ''}

const Register = () => {
    const navigate = useNavigate()

    const [registerInfo, setRegisterInfo] = useState(defaultObject)
    const [invalid, setInvalid] = useState(defaultObject)
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(async() => {
        const check = validateForm()
        if(check === 0) return
        const {password, repassword} = registerInfo
        if(password.trim().length > 0 && password !== repassword){
            const message = 'Password and Confirm password is not the same!'
            setInvalid(prev => ({...prev, repassword: message}))
        }else{
            setIsLoading(true)
            const res = await registerApi(registerInfo)
            setIsLoading(false)
            if(res.success){
                toast.success(res.message)
                navigate(`/${path.LOGIN}`)
            } 
            else toast.error(res.message)
            setRegisterInfo({...defaultObject})
        }
    })

    const validateForm = () => {
        const message = 'This field is required!'
        let check = 1
        Object.keys(registerInfo).map(e => {
            if(!registerInfo[e]){
                setInvalid(prev => ({...prev, [e]: message}))
                check = 0
            }
            if(invalid[e]){
                check = 0
            }
        })
        return check
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-r from-indigo-400 to-cyan-400 flex flex-col justify-center gap-y-10">
            <div className="text-center flex flex-col items-center -mt-16 gap-y-3">
                <h2 className="text-4xl text-white font-bold tracking-tight">
                    Register an account
                </h2>
            </div>
            <div className="flex justify-center items-center my-2 mx-4 md:mx-0">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
                    <div className="flex flex-wrap -mx-3 mb-4 px-3">
                        <div className='flex gap-x-3'>
                            <div className="basis-2/5 md:w-full mb-3">
                                <InputFields name='firstname' type='text' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} autoFocus={true} placeHolder='First name'/>
                            </div>
                            <div className="basis-3/5 md:w-full mb-3">
                                <InputFields name='lastname' type='text' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} placeHolder='Last name'/>
                            </div>
                        </div>
                        <div className="w-full md:w-full mb-3">
                            <InputFields name='email' type='text' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} placeHolder='Email'/>
                        </div>
                        <div className="w-full md:w-full mb-3">
                            <InputFields name='mobile' type='text' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} placeHolder='Phone'/>
                        </div>
                        <div className="w-full md:w-full mb-3">
                            <div className="w-full relative">
                                <InputFields name='password' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} type='password' isPassword={true} placeHolder='Password'/>
                            
                            </div>
                        </div>
                        <div className="w-full md:w-full mb-3">
                            <div className="w-full relative">
                                <InputFields name='repassword' value={registerInfo} setValue={setRegisterInfo} invalid={invalid} setInvalid={setInvalid} type='password' isPassword={true} placeHolder='Re-password'/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-full px-3 mb-3">
                        <span className="text-center block mx-auto">
                            If you have an account?
                            <Link to={`/${path.LOGIN}`} className="text-blue-500"> Login now</Link>
                        </span>
                    </div>
                    <div className="w-full md:w-full">
                        
                        <button onClick={() => handleClick()} className={`w-full flex items-center justify-center gap-x-4 bg-blue-600 border border-gray-200 rounded-lg py-3 px-3 leading-tight bg-gradient-to-r  text-white font-semibold !hover:transition-all !hover:duration-500 ` + (isLoading ? 'opacity-80 cursor-auto' : 'cursor-pointer hover:from-teal-400 hover:to-blue-500')}>
                        { isLoading &&
                            <div role="status">
                                <svg aria-hidden="true" className="size-6 text-white animate-spin dark:text-gray-600 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                            Register now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register