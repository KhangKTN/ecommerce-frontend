import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getObjectSearchParam } from '../../utils/helpers'
import { verifyVnpay } from '../../apis/order'
import path from '../../utils/path'
import _ from 'lodash'

const PaidFinish = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [status, setStatus] = useState(null)

    const fetchVerifyReturnUrlVnpay = async(queries) => {
        const res = await verifyVnpay(queries)
        console.log(res);
        if(res.success){
            navigate(`/${path.PAID_FINISH}`)
            setStatus(res)
        }
    }
    
    useEffect(() => {
        const queries = getObjectSearchParam(searchParams)
        // if(_.isEmpty(queries)) navigate(`/${path.HOME}`)
         fetchVerifyReturnUrlVnpay(queries)
    }, [])

    return (
        <div className='bg-gray-100 mt-5 rounded-md min-h-[100px] p-10 flex flex-col gap-y-5'>
            <div className='rounded-full w-fit mx-auto bg-gray-100'>
                {status?.success ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                }
            </div>
            <h1 className={`text-4xl text-center ${status?.success ? 'text-green-500' : 'text-red-500'}`}>{status?.message}</h1>
            {status?.success &&
            <>
                <p className='text-lg text-center text-gray-600'>
                    Order will be sent:
                    <span className='font-semibold italic'> {status?.data?.recipientName} ({status?.data?.phone}) | {status?.data?.address}</span>
                </p>
                <div className='flex justify-between min-w-[30%] max-w-[50%] mx-auto'>
                    <button onClick={() => navigate(`/${path.HOME}`)} className='px-5 py-2 rounded font-bold border-2 border-main text-main hover:text-white hover:bg-main'>Home page</button>
                    <button onClick={() => navigate(`/order-detail/${status?.data?._id}`)} className='px-5 py-2 rounded font-bold border-2 border-main text-main hover:text-white hover:bg-main'>Bill Detail</button>
                </div>
            </>
            }
        </div>
    )
}

export default PaidFinish