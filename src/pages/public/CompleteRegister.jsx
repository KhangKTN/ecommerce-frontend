import React, { useEffect } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import path from '../../utils/path';
import { toast } from 'react-toastify';

const CompleteRegister = () => {
    const {success} = useParams()
    console.log(success);

    useEffect(() => {
        if(success == 1) toast.success('Email verification successful, please log in')
        else toast.error('Email verification failed, please try again')
    }, [])

    return (
        <>
            <Navigate to={success == 1 ? `/${path.LOGIN}` : `/${path.REGISTER}`}/>
        </>
    )
}

export default CompleteRegister