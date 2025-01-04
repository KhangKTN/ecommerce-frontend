import React, { memo, useEffect, useState } from 'react'
import { Banner, Nav, Sidebar } from './index'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { useSelector } from 'react-redux'

const Header = () => {
    const { current } = useSelector(state => state.user)

    const [cart, setCard] = useState(null)

    useEffect(() => {
        setCard(current?.cart)
    }, [current])

    return (
        <div className='flex items-center justify-between py-10 border-b-[1px] border-gray-300'>
            <div className=''>
                <Link to={`/${path.HOME}`}>
                    <span className='text-4xl font-bold text-main'>&lt;Khang/></span>
                    <span className='text-4xl font-bold'> Shop</span>
                </Link>
            </div>
            <div className='flex items-center'>
                <div className='text-center px-5'>
                    <h1 className='text-base font-bold'>
                        <i className='fa-solid fa-phone text-main'></i> (+1800) 000 8808
                    </h1>
                    <h1 className='text-sm'>Mon-Sat 8:00 AM - 8:00 PM</h1>
                </div>
                <div className='text-center px-5 border-l-[2px]'>
                    <h1 className='text-base font-bold'>
                        <i className='fa-regular fa-envelope text-main'></i> SUPPORT@TADATHEMES.COM
                    </h1>
                    <h1 className='text-sm'>Online Support 24/7</h1>
                </div>
                <Link to={`/${path.ACCOUNT}/${path.PROFILE}`} className='px-5 border-x-[2px]'>
                    <i className='fa-solid fa-user-gear text-main text-xl'></i>
                </Link>
                <Link to={`/${path.ACCOUNT}/${path.CART}`}>
                    <div className='relative pl-5'>
                        <i className='fa-solid fa-bag-shopping text-xl text-main'></i>
                        {current?.cart.length > 0 && (
                            <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-5 rounded-full bg-red-500 text-white text-sm'>
                                {cart?.length}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default memo(Header)
