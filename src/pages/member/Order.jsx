import React, { useEffect, useState } from 'react'
import { getOrderUser } from '../../apis/order'
import TitleText from '../../components/style/TitleText'
import path from '../../utils/path'
import Bill from '../../components/order/Bill'
import { getObjectSearchParam } from '../../utils/helpers'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../components/pagination/Pagination'
import CustomSelectFilter from '../../components/CustomSelectFilter'
import { orderStatus, sortBill } from '../../utils/contants'

const Order = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParam] = useSearchParams()

    const [orderList, setOrderList] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    const fetchOrderList = async(queries) => {
        const res = await getOrderUser(queries)
        if(res.success){
            if(res.success){
                setOrderList(res.data)
                setMaxPage(res.maxPage)
                console.log(res);
            }
        }
    }

    useEffect(() => {
        const query = getObjectSearchParam(searchParams)
        fetchOrderList(query)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [searchParams])

    useEffect(() => {
        let queries = getObjectSearchParam(searchParams)
        if(page !== 0) queries.page = page + 1
        else delete queries['page'] 
        navigate({
            pathname: `/${path.ACCOUNT}/${path.ORDER}`,
            search: createSearchParams({...queries}).toString()
        })
    }, [page])

    return (
        <div>
            <TitleText text='Order List'/>
            <div className='flex gap-x-5 mt-10 mb-5'>
                <CustomSelectFilter dataList={orderStatus} name={'status'} activeClick={activeFilter} changeActiveFilter={setActiveFilter} setPage={setPage}/>
                <CustomSelectFilter dataList={sortBill} name={'sort'} type='option' activeClick={activeFilter} changeActiveFilter={setActiveFilter} setPage={setPage}/>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {orderList?.map(bill => (
                    <Bill key={bill._id} bill={bill} isAdmin={false} />
                ))}
            </div>
            {orderList?.length === 0 && <h1 className='text-xl text-red-500 text-center italic font-bold'>No invoices found!</h1>}
            <Pagination page={page} setPage={setPage} maxPage={maxPage}/>
        </div>
    )
}

export default Order