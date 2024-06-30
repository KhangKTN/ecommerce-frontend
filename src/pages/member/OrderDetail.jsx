import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleText from '../../components/style/TitleText';
import { getOrderDetail } from '../../apis/order';
import CartItem from '../../components/CartItem';
import moment from 'moment';
import { getFormatVND } from '../../utils/helpers';
import Comment from '../../components/Comment';
import FormComment from '../../components/vote/FormComment';

const OrderDetail = () => {
    const {id} = useParams()

    const [order, setOrder] = useState(null)
    const [productComment, setProductComment] = useState(null)

    const fetchOrderDetail = async() => {
        if(id){
            const res = await getOrderDetail(id)
            if(res.success) setOrder(res.data)
            console.log(res);
        }
    }

    useEffect(() => {
        fetchOrderDetail()
        window.scrollTo({top: 0})
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
                <div className='flex gap-x-5 items-center'>
                    <span className='min-w-[10%] text-right'>Status:</span>
                    <span className={`px-3 py-1 font-semibold rounded text-white ${getColor(order?.status)}`}>{order?.status}</span>
                </div>
                <div className='flex gap-x-5'>
                    <span className='min-w-[10%] text-right'>Order date:</span>
                    <span>{moment(order?.createdAt).format('DD-MM-yyyy hh:mm')}</span>
                </div>
                {order?.cancelReason && order?.status === 'Cancel' &&
                    <div className='flex justify-between'>
                        <span className='min-w-[10%] text-right'>Reason:</span>
                        <span className='italic text-red-500'>{order?.cancelReason}</span>
                    </div>
                }
                <div className='flex gap-x-5'>
                    <span className='min-w-[10%] text-right'>Order ID:</span>
                    <span>{order?._id}</span>
                </div>
                <div className='flex gap-x-5'>
                    <span className='min-w-[10%] text-right'>Address:</span>
                    <span>{`${order?.recipientName} (${order?.phone}) | ${order?.address}`}</span>
                </div>
                <div className='flex gap-x-5 items-center'>
                    <span className='min-w-[10%] text-right'>Payment:</span>
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
                            isShowRating={!item?.isRating && order.status === 'Finish'}
                            setProductComment={setProductComment}
                        />
                    ))}
                </div>
                <div className='flex justify-end'>
                    <span className='text-lg font-bold text-red-500'>{getFormatVND(order?.totalPrice)}</span>
                </div>
                <div className='text-right'>
                </div>
            </div>
            {productComment &&
                <div className='mt-5'>
                    <FormComment reload={fetchOrderDetail} data={{productId: productComment?.productId, variant: productComment?.variant, variantId: productComment?.variantId, orderId: id}} />
                </div>
            }
        </div>
    )
}

export default OrderDetail