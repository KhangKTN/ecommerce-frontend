import React, { useEffect, useState } from 'react'
import { getProducts } from "../apis"
import Product from './Product'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';

const tabs = [
    {id: 1, name: 'best seller', logo: 'https://www.psdstamps.com/wp-content/uploads/2020/04/grunge-best-seller-label-png.png'},
    {id: 2, name: 'new', logo: 'https://static.vecteezy.com/system/resources/previews/017/178/221/original/new-sticker-label-on-transparent-background-free-png.png'}
]

const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    swipeToSlide: true,
}

const BestSeller = () => {
    const [productSeller, setProductSeller] = useState([])
    const [productNew, setProductNew] = useState([])
    const [activeTab, setActiveTab] = useState(1)

    const fetchProducts = async() => {
        const res = await Promise.all([getProducts({sort: '-sold'}), getProducts({sort: '-createdAt'})])
        // console.log(res[0].data);
        if(res[0]?.success) setProductSeller(res[0].data)
        if(res[0]?.success) setProductNew(res[1].data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return(
        <>
            <div className='mt-5 flex py-3 border-b-[3px] border-[#5bbcff]'>
                {tabs.map((item, index) => (
                    <div onClick={() => setActiveTab(item.id)} key={item.id} className={'uppercase text-xl font-bold cursor-pointer tracking-wider' + (activeTab === item.id ? ' text-main' : ' text-black')  + (index === 0 ? ' pr-4' : ' px-4 border-l-[2px] border-gray-300')}>{item.name}</div>
                ))}
            </div>
            <div className='w-[calc(100%+20px)] -ml-[10px]'>
                <CustomSlider logo={tabs[activeTab-1].logo} productList={activeTab === 1 ? productSeller : productNew}/>
            </div>
            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                <img className='rounded-md' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="" />
                <img className='rounded-md' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="" />
            </div>
        </>
    )
}

export default BestSeller