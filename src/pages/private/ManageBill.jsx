import React, { useEffect, useState } from 'react'
import { getOrderListAdmin } from '../../apis/order'
import TitleText from '../../components/style/TitleText'
import Bill from '../../components/order/Bill'
import { orderStatus } from '../../utils/contants'
import CustomSelectFilter from '../../components/CustomSelectFilter'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getObjectSearchParam } from '../../utils/helpers'
import Pagination from '../../components/pagination/Pagination'
import path from '../../utils/path'

const sortBill = [
    {key: '-createdAt', value: 'Order Latest'},
    {key: 'createdAt', value: 'Order Oldest'},
    {key: 'totalPrice', value: 'Price ASC'},
    {key: '-totalPrice', value: 'Price DESC'}
]

const ManageBill = () => {
    const navigate = useNavigate()

    const [orderList, setOrderList] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null)
    const [searchParams, setSearchParam] = useSearchParams()
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    const fetchOrderList = async(query) => {
        const res = await getOrderListAdmin(query)
        if(res.success){
            setOrderList(res.data)
            setMaxPage(res.maxPage)
            console.log(res);
        }
    }

    useEffect(() => {
        const query = getObjectSearchParam(searchParams)
        fetchOrderList(query)
    }, [searchParams])

    useEffect(() => {
        let queries = getObjectSearchParam(searchParams)
        if(page !== 0) queries.page = page + 1
        else delete queries['page'] 
        navigate({
            pathname: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
            search: createSearchParams({...queries}).toString()
        })
    }, [page])

    return (
        <div>
            <TitleText text='Bill List'/>
            <div className='flex gap-x-5 mt-10 mb-5'>
                <CustomSelectFilter dataList={orderStatus} name={'status'} activeClick={activeFilter} changeActiveFilter={setActiveFilter} setPage={setPage}/>
                <CustomSelectFilter dataList={sortBill} name={'sort'} type='option' activeClick={activeFilter} changeActiveFilter={setActiveFilter} setPage={setPage}/>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {orderList?.map(bill => (
                    <Bill key={bill._id} bill={bill} isEdit={true} />
                ))}
            </div>
            <Pagination page={page} setPage={setPage} maxPage={maxPage} setIsLoadFirst={() => {}} />
        </div>
    )
}

export default ManageBill