import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getOrderUser } from '../../apis/order';
import Bill from '../../components/order/Bill';
import Pagination from '../../components/pagination/Pagination';
import { CustomSelectFilter, TitleText } from '../../components/ui';
import { orderStatus, sortBill } from '../../utils/contants';
import { getObjectSearchParam } from '../../utils/helpers';
import path from '../../utils/path';

const Order = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [orderList, setOrderList] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [time, setTime] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ])

    const fetchOrderList = async (queries) => {
        const res = await getOrderUser(queries)
        if (res.success) {
            if (res.success) {
                setOrderList(res.data)
                setMaxPage(res.maxPage)
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.id.includes('filter')) {
                setActiveFilter(null)
            }
        }
        document.addEventListener('click', handleClickOutside)

        const query = getObjectSearchParam(searchParams)
        fetchOrderList(query)
        window.scrollTo({ top: 0, behavior: 'smooth' })

        return () => document.removeEventListener('click', handleClickOutside)
    }, [searchParams])

    useEffect(() => {
        let queries = getObjectSearchParam(searchParams)
        if (page !== 0) queries.page = page + 1
        else delete queries['page']
        navigate({
            pathname: `/${path.ACCOUNT}/${path.ORDER}`,
            search: createSearchParams({ ...queries }).toString()
        })
    }, [page])

    useEffect(() => {
        let queries = getObjectSearchParam(searchParams)
        if (time[0].startDate || time[0].endDate) {
            queries['date[gte]'] = time[0]?.startDate?.getTime()
            queries['date[lte]'] = time[0]?.endDate?.getTime()
        } else {
            delete queries['date[gte]']
            delete queries['date[lte]']
        }
        navigate({
            pathname: `/${path.ACCOUNT}/${path.ORDER}`,
            search: createSearchParams({ ...queries }).toString()
        })
    }, [time])

    return (
        <div>
            <TitleText text='Order List' />
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
                <div className='relative'>
                    <button
                        id='order_filter_button_date'
                        onClick={() => {
                            setActiveFilter('date-range')
                        }}
                        className={`border-[1px] px-4 py-3 cursor-pointer rounded-md flex items-center ${
                            activeFilter === 'date-range' ? 'bg-main text-white' : 'border-main text-gray-500'
                        }`}
                    >
                        {time[0].startDate
                            ? `${moment(time[0].startDate).format('DD/MM/YYYY')} - ${moment(time[0].startDate).format(
                                  'DD/MM/YYYY'
                              )}`
                            : 'Choose date'}
                    </button>
                    {activeFilter === 'date-range' && (
                        <div onClick={(e) => e.stopPropagation()} id={'order_filter_picker_date'}>
                            <DateRangePicker
                                editableDateInputs={true}
                                onChange={(item) => setTime([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={time}
                                maxDate={new Date()}
                                className='absolute top-[calc(100%+1px)]'
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {orderList?.map((bill) => (
                    <Bill key={bill._id} bill={bill} isAdmin={false} />
                ))}
            </div>
            {orderList?.length === 0 && (
                <h1 className='text-xl text-red-500 text-center italic font-bold'>No invoices found!</h1>
            )}
            <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
    )
}

export default Order
