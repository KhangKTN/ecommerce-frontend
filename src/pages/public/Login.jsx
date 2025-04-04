import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginApi } from '../../apis'
import { login } from '../../app/slices/userSlide'
import { InputFields } from '../../components/ui'
import path from '../../utils/path'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { isLoggedIn } = useSelector((state) => state.user)

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
    const [invalid, setInvalid] = useState({ email: '', password: '' })

    useEffect(() => {
        if (isLoggedIn) {
            const returnUri = searchParams.get('returnUri')
            navigate(returnUri ? `/${returnUri}` : `/${path.HOME}`)
        }
    }, [isLoggedIn])

    const handleClick = async () => {
        const isValidate = validateForm()
        if (!isValidate) return
        const res = await loginApi(loginInfo)
        if (res.success) {
            dispatch(login({ isLoggedIn: true, token: res.accessToken }))
        } else {
            toast.error(res.message)
        }
    }

    const validateForm = () => {
        let valid = true
        Object.keys(loginInfo).map((e) => {
            if (!loginInfo[e]) {
                setInvalid((prev) => ({ ...prev, [e]: `${e} is required!` }))
                valid = false
            }
            if (invalid[e]) {
                valid = false
            }
        })
        return valid
    }

    return (
        <div className='w-screen h-screen bg-gradient-to-r from-indigo-400 to-cyan-400 flex flex-col justify-center gap-y-10'>
            <div className='text-center flex flex-col items-center -mt-16 gap-y-3'>
                <div className=''>
                    <svg fill='none' viewBox='0 0 24 24' className='w-12 h-12 text-blue-500' stroke='currentColor'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        />
                    </svg>
                </div>
                <h2 className='text-4xl text-white font-bold tracking-tight'>Sign in into your account</h2>
            </div>
            <div className='flex justify-center items-center my-2 mx-4 md:mx-0'>
                <div className='w-full max-w-md bg-white rounded-xl shadow-md p-6'>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <InputFields
                                name='email'
                                type='email'
                                value={loginInfo}
                                setValue={setLoginInfo}
                                invalid={invalid}
                                setInvalid={setInvalid}
                                autoFocus={true}
                                placeHolder='Email'
                            />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <div className='w-full relative'>
                                <InputFields
                                    name='password'
                                    value={loginInfo}
                                    setValue={setLoginInfo}
                                    invalid={invalid}
                                    setInvalid={setInvalid}
                                    placeHolder='Password'
                                    type='password'
                                    isPassword={true}
                                />
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-between px-3 mb-3 '>
                            <label htmlFor='remember' className='flex items-center w-1/2'>
                                <input type='checkbox' name='' id='' className='mr-1 bg-white shadow' />
                                <span className='text-sm text-gray-700 pt-1'>Remember Me</span>
                            </label>
                            <div className='w-1/2 text-right'>
                                <Link
                                    to={`/${path.FORGOT_PASSWORD}?step=1`}
                                    className='text-blue-500 text-sm tracking-tight'
                                >
                                    Forget your password?
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <button
                                onClick={() => handleClick()}
                                className='w-full bg-blue-600 border border-gray-200 rounded-lg py-3 px-3 leading-tight bg-gradient-to-r hover:from-teal-400 hover:to-blue-500  text-white font-semibold !hover:transition-all !hover:duration-500'
                            >
                                Sign in
                            </button>
                            <span className='text-center block mx-auto mt-3'>
                                If you don't have an account?
                                <Link to={`/${path.REGISTER}`} className='text-blue-500'>
                                    {' '}
                                    Register now
                                </Link>
                            </span>
                            <div>
                                <span className='text-center block mx-auto mt-3'>
                                    <Link to={`/${path.HOME}`} className='text-blue-500'>
                                        Back to Homepage
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className='mx-auto -mb-6 pb-1'>
                            <span className='text-center text-xs text-gray-700'>or sign up with</span>
                        </div>
                        <div className='flex items-center w-full mt-2'>
                            <div className='w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400'>
                                <button className='appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none'>
                                    <svg className='h-6 w-6 fill-current text-gray-700' viewBox='0 0 512 512'>
                                        <path d='M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z' />
                                    </svg>
                                </button>
                            </div>
                            <div className='w-full md:w-1/3 px-3 pt-4 mx-2'>
                                <Link
                                    to={'http://localhost:8080/api/auth/google'}
                                    className='appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none'
                                >
                                    <svg
                                        className='h-6 w-6 fill-current text-gray-700'
                                        xmlns='http://www.w3.org/2000/svg'
                                        x='0px'
                                        y='0px'
                                        viewBox='0 0 48 48'
                                    >
                                        <path
                                            fill='#FFC107'
                                            d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                                        ></path>
                                        <path
                                            fill='#FF3D00'
                                            d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                                        ></path>
                                        <path
                                            fill='#4CAF50'
                                            d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                                        ></path>
                                        <path
                                            fill='#1976D2'
                                            d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                                        ></path>
                                    </svg>
                                </Link>
                            </div>
                            <div className='w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400'>
                                <button className='appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none'>
                                    <svg className='h-6 w-6 fill-current text-gray-700' viewBox='0 0 512 512'>
                                        <path d='M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z' />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
