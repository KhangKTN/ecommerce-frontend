import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useLocation, useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { getBrandList, getProducts } from '../../apis/product'
import Product from '../../components/Product'
import Rating from '../../components/Rating';
import CustomSelectFilter from '../../components/CustomSelectFilter';
import { colors, ratings } from '../../utils/contants';
import path from '../../utils/path';
import { getObjectSearchParam } from '../../utils/helpers';

const Products = () => {
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()

    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [isLoadFirst, setIsLoadFirst] = useState(true)

    const [activeFilter, setActiveFilter] = useState(null)

    const fetchBrandList = async() => {
        const res = await getBrandList()
        if(res.success) setBrandList(res.data)
    }

    const fetchProductList = async(queries) => {
        const res = await getProducts(queries)
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
        fetchBrandList()
    }, [])

    useEffect(() => {
        const queries = getObjectSearchParam(query.entries())
        if(isLoadFirst){
            setPage(queries['page'] ? queries['page'] - 1 : 0)
        }
        fetchProductList(queries)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [query])

    useEffect(() => {
        if(!isLoadFirst){
            const queries = getObjectSearchParam(query.entries())
            if(page === 0) delete queries['page']
            else queries.page = page + 1
            navigate({
                pathname: `/${path.PRODUCTS}`,
                search: createSearchParams({...queries}).toString()
            })
        }
    }, [page])

    return (
        <div className='mt-10'>
            <h1 className='uppercase font-bold text-2xl py-3 border-b-[3px] border-[#5bbcff]'>Product result</h1>
            <div className='flex gap-x-5 mt-3'>
                <CustomSelectFilter name='brand' dataList={brandList} setPage={setPage} activeClick={activeFilter} changeActiveFilter={setActiveFilter}/>
                <CustomSelectFilter name='rating' dataList={ratings} setPage={setPage} activeClick={activeFilter} changeActiveFilter={setActiveFilter}/>
                <CustomSelectFilter name='Price' activeClick={activeFilter} setPage={setPage} changeActiveFilter={setActiveFilter} type='input'/>
                <CustomSelectFilter name='sort' activeClick={activeFilter} setPage={setPage} changeActiveFilter={setActiveFilter} type='option'/>
            </div>
            <div className='grid grid-cols-4 gap-3 -ml-[10px] w-[calc(100%+20px)] max-h-full overflow-y-auto'>
                {productList?.map(item => (
                    <Product key={item._id} product={item}/>
                ))}
            </div>
                {productList?.length === 0 && <div className='capitalize font-semibold text-2xl mt-5 min-h-[350px] text-center'>Not found product!</div>
                }
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next >'
                onPageChange={(e) => {setPage(e.selected); isLoadFirst && setIsLoadFirst(false)}}
                pageRangeDisplayed={5}
                pageCount={maxPage}
                forcePage={page}
                previousLabel="< Prev"
                renderOnZeroPageCount={null}
                previousClassName="rounded-md hover:bg-gray-100 hover:text-main"
                previousLinkClassName="px-4 py-2 block"
                pageClassName="text-gray-500 rounded-full hover:bg-gray-100 hover:text-main"
                pageLinkClassName="px-4 py-2 block"
                nextClassName="rounded-md hover:bg-gray-100 hover:text-main"
                nextLinkClassName="px-4 py-2 block"
                containerClassName="flex items-center w-fit mt-10 mx-auto"
                activeClassName="bg-main rounded-full shadow-lg text-white hover:bg-main hover:text-white"
            />
        </div>
    )
}

export default memo(Products)