import React, { memo, useState } from 'react'
import { getFormatVND } from '../../utils/helpers'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { orderStatus } from '../../utils/contants'

const Bill = ({bill, isEdit}) => {
    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const getImage = (products) => {
        const imageUrl = products[0].product?.thumbnail
        return imageUrl
    }

    const getVariant = (productItem) => {
        const variant = productItem?.product?.variant?.find(vart => vart._id === productItem.variant)
        return `(${variant?.variantType}: ${variant?.name})`
    }

    const getColor = (status) => {
        let color = ''
        if(status === 'Finish') color = 'bg-green-500'
        else if(status === 'Cancel') color = 'bg-red-500'
        else if(status === 'Processing') color = 'bg-yellow-400'
        else color = 'bg-main'
        return color
    }

    return (
        <div className='p-5 rounded-md shadow-md border-2 border-main flex flex-col gap-y-3 h-fit'>
            <div className='flex items-center gap-x-10'>
                <img className='w-[80px] h-[100px] object-contain' src={getImage(bill.products)} alt="" />
                <ul className='list-decimal w-full'>
                    {bill.products.map(pro => (
                        <li className=''>
                            <div className='flex justify-between'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold truncate'>{pro?.product?.name}</span>
                                    <span className='text-gray-500 italic'>{pro.variant && getVariant(pro)}</span>
                                </div>
                                <span className='ml-5 text-gray-500'>x{pro.quantity}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-between items-center'>
                <span>Order by:</span>
                <span>{`${bill?.orderBy?.firstname} (${bill?.orderBy?.email} | ${bill?.orderBy?.mobile})`}</span>
            </div>
            <div className='flex justify-between items-center'>
                <span>Order date:</span>
                <span>{moment(bill.createdAt).format('DD/MM/yyyy hh:mm')}</span>
            </div>
            <div className='flex justify-between items-center'>
                <span>Status:</span>
                <span className={`px-3 py-1 font-semibold rounded text-white ${getColor(bill.status)}`}>{bill.status}</span>
            </div>
            <div className='flex justify-between items-center'>
            {bill.cancelReason && bill.status === 'Cancel' ?
                <>
                    <span>Reason:</span>
                    <span className='italic text-red-500'>{bill.cancelReason}</span>
                </>
                :
                <>
                    <span>Payment:</span>
                    {bill.dateOfPayment ?
                        <span className={`rounded text-green-500`}>Paid <span>on {moment(bill.dateOfPayment).format('DD/MM/yyyy hh:mm')}</span></span>
                        :
                        <span className='px-3 py-1 rounded text-white bg-red-400'>Unpaid</span>
                    }
                </>
            }
            </div>
            <div className='flex justify-between items-center'>
            </div>
            <div className='flex justify-between'>
                <h1 className=''>Total:</h1>
                <span className='text-lg font-bold text-red-500'>{getFormatVND(bill.totalPrice)}</span>
            </div>
            <div className='w-full h-[1px] bg-gray-200'></div>
            <div className='flex justify-between items-center'>
                {isEdit && (bill.status !== 'Finish' && bill.status !== 'Cancel') &&
                    <div className='relative'>
                        <div className='flex'>
                            <button onClick={(e) => {console.log(e.target.innerHTML);}} className="text-white border-r-[1px] border-white bg-main hover:bg-sky-500 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-s-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                                {orderStatus[orderStatus.findIndex(item => item.value === bill.status) + 1].value}
                            </button>
                            <button onClick={() => setIsShowDropdown(!isShowDropdown)} className="min-h-full text-white bg-main hover:bg-sky-500 font-medium rounded-e-lg text-sm px-2 text-center block items-center" type="button">
                                <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </div>

                        <div hidden={!isShowDropdown} class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="p-2 text-sm text-gray-700 dark:text-gray-200">
                                <li className='rounded block px-4 py-2 cursor-pointer hover:bg-red-300 dark:hover:bg-gray-600 dark:hover:text-white'>{orderStatus[orderStatus.length - 1].value}</li>
                            </ul>
                        </div>
                    </div>
                }
                <Link to={`/order-detail/${bill._id}`} className='text-lg ml-auto text-main font-bold underline cursor-pointer'>View detail</Link>
            </div>
        </div>
    )
}

export default memo(Bill)