import React, { useEffect, useState } from 'react'
import { getOrderUser } from '../../apis/order'
import TitleText from '../../components/style/TitleText'
import path from '../../utils/path'
import Bill from '../../components/order/Bill'

const Order = () => {
    const [orderList, setOrderList] = useState(null)

    const fetchOrderList = async() => {
        const res = await getOrderUser()
        if(res.success){
            setOrderList(res.data)
        }
    }

    useEffect(() => {
        fetchOrderList()
    }, [])

    return (
        <div>
            <TitleText text='Order List'/>
            <div>

            </div>
            <div className='grid grid-cols-2 gap-x-5'>
                {orderList?.map(bill => (
                    <Bill key={bill._id} bill={bill} isEdit={false} />
                ))}
            </div>
        </div>
    )
}

export default Order