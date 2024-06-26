import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleText from '../../components/style/TitleText';
import { getOrderDetail } from '../../apis/order';
import CartItem from '../../components/CartItem';
import moment from 'moment';
import { getFormatVND } from '../../utils/helpers';

const OrderDetail = () => {
    const {id} = useParams()

    const [order, setOrder] = useState(null)

    const fetchOrderDetail = async() => {
        if(id){
            const res = await getOrderDetail(id)
            console.log(res);
            if(res.success) setOrder(res.data)
        }
    }

    useEffect(() => {
        fetchOrderDetail()
    }, [])

    const getColor = (status) => {
        let color = ''
        if(status === 'Finish') color = 'bg-green-500'
        else if(status === 'Cancel') color = 'bg-red-500'
        else if(status === 'Processing') color = 'bg-yellow-400'
        else color = 'bg-main'
        return color
    }

    return (
        <div className='mt-5'>
            <TitleText text='Order Detail'/>
            <div className='flex flex-col gap-y-5 bg-gray-50 p-5 rounded-md'>
                <div className='flex gap-x-5'>
                    <span>Status:</span>
                    <span className={`px-3 py-1 font-semibold rounded text-white ${getColor(order?.status)}`}>{order?.status}</span>
                </div>
                <div className='flex gap-x-5'>
                    <span>Order date:</span>
                    <span>{moment(order?.createdAt).format('DD-MM-yyyy hh:mm')}</span>
                </div>
                {order?.cancelReason && order?.status === 'Cancel' &&
                    <div className='flex justify-between'>
                        <span>Reason:</span>
                        <span className='italic text-red-500'>{order?.cancelReason}</span>
                    </div>
                }
                <div className='flex gap-x-5'>
                    <span>Order ID:</span>
                    <span>{order?._id}</span>
                </div>
                <div className='flex gap-x-5'>
                    <span>Address:</span>
                    <span>{`${order?.recipientName} (${order?.phone}) | ${order?.address}`}</span>
                </div>
                <div className='flex justify-between'>
                    <span>Payment:</span>
                    {order?.dateOfPayment ?
                        <span className={`px-3 py-1 rounded text-white bg-green-500`}>Paid <span>on {moment(order?.dateOfPayment).format('DD-MM-yyyy hh:mm')}</span></span>
                        :
                        <span className='px-3 py-1 rounded text-white bg-red-400'>Unpaid</span>
                    }
                </div>
                <div>
                    {order?.products?.map((item, index) => (
                        <CartItem 
                            key={item._id} 
                            index={index} 
                            cartItem={item} 
                            handleChangeQuantity={null} 
                            handleChecked={null}
                        />
                    ))}
                </div>
                <div className='flex justify-end'>
                    <span className='text-lg font-bold text-red-500'>{getFormatVND(order?.totalPrice)}</span>
                </div>
                <div className='text-right'>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail