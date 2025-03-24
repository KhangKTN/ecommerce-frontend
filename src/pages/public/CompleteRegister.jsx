import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from '../../utils/path'

const CompleteRegister = () => {
    const { success } = useParams()

    useEffect(() => {
        if (success == 1) toast.success('Email verification successful, please log in')
        else toast.error('Email verification failed, please try again')
    }, [])

    return (
        <>
            <Navigate to={success == 1 ? `/${path.LOGIN}` : `/${path.REGISTER}`} />
        </>
    )
}

export default CompleteRegister
