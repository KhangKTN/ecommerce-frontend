import React, { useEffect, useState } from 'react'
import { getProducts } from '../../apis'
import FeaturedItem from './FeaturedItem'

const FeatureProduct = () => {
    const [productList, setProductList] = useState([])

    const fetchProducts = async () => {
        const res = await getProducts({ limit: 9, totalRating: 5 })
        if (res?.success) {
            setProductList(res.data)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='mt-5'>
            <div className='py-[15px] border-b-[3px] border-[#5bbcff]'>
                <span className='text-xl font-bold uppercase tracking-wider'>Featured Products</span>
            </div>
            <div className='mt-3 grid grid-cols-3 gap-4'>
                {productList?.map((item) => (
                    <FeaturedItem key={item._id} product={item} />
                ))}
            </div>
            <div className='flex mt-5 gap-x-3 h-[650px]'>
                <img
                    className='h-full'
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
                    alt=''
                />
                <div className='basis-1/2 flex gap-x-3'>
                    <div className='basis-1/2 flex flex-col gap-y-3'>
                        <img
                            className='h-[55%] w-full'
                            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
                            alt=''
                        />
                        <img
                            className='h-[45%] w-full'
                            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
                            alt=''
                        />
                    </div>
                    <div>
                        <img
                            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureProduct
