import React, { useEffect, useState } from 'react'
import { getProducts } from '../apis'
import Product from './Product'
import CustomSlider from './CustomSlider'

const tabs = [
    {id: '1', name: 'Smartphone'},
    {id: '2', name: 'Tablet'},
    {id: '3', name: 'Laptop'}
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    swipeToSlide: true
}

const NewArrival = () => {
    const [tabActive, setTabActive] = useState(tabs[0])
    const [productList, setProductList] = useState([])

    const fetchProductList = async() => {
        const res = await getProducts({category: tabActive.name})
        if(res?.success) setProductList(res.data)
    }

    useEffect(() => {
        fetchProductList()
    }, [tabActive])

    return (
        <>
            <div className='mt-5 py-3 border-b-[3px] border-[#5bbcff] flex justify-between'>
                <span className='font-bold text-xl uppercase tracking-wider'>New Arrivals</span>
                <div>
                    {tabs?.map((item, index) => (
                        <span key={item.id} onClick={() => setTabActive(item)} className={'pl-3 ml-3 cursor-pointer ' + (index === 0 ? '' : 'border-l-[1px]') + (tabActive.id === item.id ? ' text-main' : ' text-black')}>{item.name}</span>
                    ))}
                </div>
            </div>
            <div className='ml-[-10px] w-[calc(100%+20px)]'>
                <CustomSlider productList={productList} showInfo={1}/>
            </div>
        </>
    )
}

export default NewArrival