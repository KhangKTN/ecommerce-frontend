import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getOrderListAdmin } from '../../apis/order'
import Bill from '../../components/order/Bill'
import Pagination from '../../components/pagination/Pagination'
import { CustomSelectFilter, TitleText } from '../../components/ui'
import { orderStatus, sortBill } from '../../utils/contants'
import { getObjectSearchParam } from '../../utils/helpers'
import path from '../../utils/path'

const ManageBill = () => {
    const navigate = useNavigate()

    const [orderList, setOrderList] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null)
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    const fetchOrderList = async () => {
        const queries = getObjectSearchParam(searchParams)
        const res = await getOrderListAdmin(queries)
        if (res.success) {
            setOrderList(res.data)
            setMaxPage(res.maxPage)
            console.log(res)
        }
    }

    useEffect(() => {
        fetchOrderList()
    }, [searchParams])

    useEffect(() => {
        let queries = getObjectSearchParam(searchParams)
        if (page !== 0) queries.page = page + 1
        else delete queries['page']
        navigate({
            pathname: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
            search: createSearchParams({ ...queries }).toString()
        })
    }, [page])

    return (
        <div>
            <TitleText text='Bill List' />
            <div className='flex gap-x-5 mt-10 mb-5'>
                <CustomSelectFilter
                    dataList={orderStatus}
                    name={'status'}
                    activeClick={activeFilter}
                    changeActiveFilter={setActiveFilter}
                    setPage={setPage}
                />
                <CustomSelectFilter
                    dataList={sortBill}
                    name={'sort'}
                    type='option'
                    activeClick={activeFilter}
                    changeActiveFilter={setActiveFilter}
                    setPage={setPage}
                />
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {orderList?.map((bill) => (
                    <Bill key={bill._id} bill={bill} isAdmin={true} reloadList={fetchOrderList} />
                ))}
            </div>
            <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
    )
}

export default ManageBill
