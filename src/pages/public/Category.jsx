import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProducts } from '../../apis/product'
import Product from '../../components/Product'
import CustomSelectFilter from '../../components/CustomSelectFilter';
import { colors, ratings } from '../../utils/contants';
import { getObjectSearchParam } from '../../utils/helpers';


const Category = () => {
    const {category} = useParams()
    const [query, setQuery] = useSearchParams()

    const [productList, setProductList] = useState(null)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [activeFilter, setActiveFilter] = useState(null)


    const fetchProductList = async(queries) => {
        const res = await getProducts({...queries, category: category.charAt(0).toUpperCase() + category.substring(1)})
        if(res?.success){
            setProductList(res?.data)
            const pageSize = Math.ceil(res.count/12)
            setMaxPage(pageSize)
        }
        else{
            setProductList([])
            setMaxPage(0)
        }
    }

    useEffect(() => {
        const queries = getObjectSearchParam(query.entries())
        console.log('check query:', queries);
        fetchProductList(queries)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [query])

    return (
        <div className='mt-10'>
            <h1 className='uppercase font-bold text-2xl py-3 border-b-[3px] border-[#5bbcff]'>{category}</h1>
            <div className='flex gap-x-5 mt-3'>
                <CustomSelectFilter name='color' dataList={colors} setPage={setPage} activeClick={activeFilter} changeActiveFilter={setActiveFilter}/>
                <CustomSelectFilter name='rating' dataList={ratings} setPage={setPage} activeClick={activeFilter} changeActiveFilter={setActiveFilter}/>
                <CustomSelectFilter name='Price' activeClick={activeFilter} setPage={setPage} changeActiveFilter={setActiveFilter} type='input'/>
                <CustomSelectFilter name='sort' activeClick={activeFilter} setPage={setPage} changeActiveFilter={setActiveFilter} type='option'/>
            </div>
            <div className='grid grid-cols-4 gap-3 -ml-[10px] w-[calc(100%+20px)]'>
                {productList?.map(item => (
                    <Product key={item._id} product={item}/>
                ))}
            </div>
            {
                productList?.length === 0 && <div className='capitalize font-semibold text-2xl mt-5 min-h-[350px] text-center'>Not found product!</div>
            }
        </div>
    )
}

export default Category