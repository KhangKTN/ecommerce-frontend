import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSuccess } from '../../apis'
import { login } from '../../app/userSlide'

const LoginSuccess = () => {
    const { userId } = useParams()
    const [searchParams] = useSearchParams()
    const dispatcher = useDispatch()
    const { isLoggedIn } = useSelector(state => state.user)

    const fetchUserData = async () => {
        const res = await loginSuccess({ userId, verifyToken: searchParams.get('token_verify_login') })
        console.log(res)
        if (res.success) {
            dispatcher(login({ token: res.accessToken, isLoggedIn: true }))
        } else {
            toast.error(`Something isn't correct. Please login again!`)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return <>{isLoggedIn && <Navigate to={`/`} />}</>
}

export default LoginSuccess
