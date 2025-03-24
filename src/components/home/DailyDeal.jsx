import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../apis'
import { getFormatVND, getHour, getMinute, getSecond } from '../../utils/helpers'
import { Rating } from '../product'
import CountdownLabel from './CountdownLabel'

let interval = null

const DailyDeal = () => {
    const [time, setTime] = useState(new Date().getTime())
    const [expireTime, setExpireTime] = useState(new Date().getTime() + 2 * 60 * 60 * 1000)
    const [product, setProduct] = useState()
    const [listProduct, setListProduct] = useState([])

    const fetchProducts = async () => {
        const res = await getProducts({ sort: '-sold' })
        if (res?.success) {
            setListProduct(res.data)
            setProduct(res.data[Math.round(Math.random() * 12)])
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (time >= expireTime) {
            setProduct(listProduct[Math.round(Math.random() * 12)])
            if (interval) clearInterval(interval)
            setExpireTime(new Date().getTime() + 1 * 60 * 60 * 1000)
        }
    }, [time])

    useEffect(() => {
        interval = setInterval(() => {
            setTime((prev) => prev + 1000)
        }, 1000)
        return () => clearInterval(interval)
    }, [expireTime])

    return (
        <div className='rounded-md border mt-8 h-[600px] p-5 flex flex-col justify-between'>
            <div className='flex items-center'>
                <span className='w-[20%]'>
                    <svg
                        className={'text-red-600 size-5'}
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 22 20'
                    >
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                    </svg>
                </span>
                <h1 className='w-[60%] uppercase text-center font-bold text-xl tracking-wider'>Daily Deal</h1>
                <span className='w-[20%]'>
                    <svg
                        className={'text-red-600 size-5 ms-auto'}
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 22 20'
                    >
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                    </svg>
                </span>
            </div>
            <div className='text-center items-center flex flex-col gap-y-3'>
                <Link to={`/${product?.category.toLowerCase()}/${product?._id}/${product?.slug}`}>
                    <img className='w-full h-[250px]' src={product?.thumbnail} alt='' />
                    <h1 className='font-bold text-xl hover:text-main hover:cursor-pointer'>{product?.name}</h1>
                </Link>
                <Rating rating={product?.totalRating} />
                <h1 className='font-semibold text-red-500 text-2xl'>{getFormatVND(product?.price)}</h1>
                <div className='grid grid-cols-3 gap-x-3'>
                    <CountdownLabel label={'Hours'} value={getHour(time, expireTime)} />
                    <CountdownLabel label={'Minutes'} value={getMinute(time, expireTime)} />
                    <CountdownLabel label={'Seconds'} value={getSecond(time, expireTime)} />
                </div>
                <div>
                    <button
                        type='submit'
                        className='w-full bg-main px-4 py-3 hover:cursor-pointer text-white font-bold rounded-md'
                    >
                        <i className='fa-solid fa-bars mr-2'></i> OPTION
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DailyDeal
