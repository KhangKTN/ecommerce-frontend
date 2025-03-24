import React, { memo, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getBrandList, getProducts } from '../../apis/product'
import Pagination from '../../components/pagination/Pagination'
import { Product } from '../../components/product'
import { CustomSelectFilter } from '../../components/ui'
import { ratings, sortList } from '../../utils/contants'
import { getObjectSearchParam } from '../../utils/helpers'
import path from '../../utils/path'

const Products = () => {
    const [query] = useSearchParams()
    const navigate = useNavigate()

    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [isLoadFirst, setLoadFirst] = useState(true)

    const [activeFilter, setActiveFilter] = useState(null)

    const fetchBrandList = async () => {
        const res = await getBrandList()
        if (res.success) {
            setBrandList(res.data)
        }
    }

    const fetchProductList = async (queries) => {
        const res = await getProducts(queries)
        if (res?.success) {
            setProductList(res?.data)
            const pageSize = Math.ceil(res.count / (queries.limit || 12))
            setMaxPage(pageSize)
        } else {
            setProductList([])
            setMaxPage(0)
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log(e.target.id)
            if (!e.target.id.includes('filter')) {
                setActiveFilter(null)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        const queries = getObjectSearchParam(query.entries())
        if (isLoadFirst) {
            fetchBrandList()
            setPage(queries['page'] ? queries['page'] - 1 : 0)
        }
        fetchProductList(queries)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [query])

    useEffect(() => {
        if (!isLoadFirst) {
            const queries = getObjectSearchParam(query.entries())
            queries.page = page + 1
            navigate({
                pathname: `/${path.PRODUCTS}`,
                search: createSearchParams({ ...queries }).toString()
            })
        }
    }, [page])

    return (
        <div className='mt-10'>
            <h1 className='uppercase font-bold text-2xl py-3 border-b-[3px] border-[#5bbcff]'>Product result</h1>
            <div className='flex gap-x-5 mt-3'>
                <CustomSelectFilter
                    name='brand'
                    dataList={brandList}
                    setPage={setPage}
                    activeClick={activeFilter}
                    changeActiveFilter={setActiveFilter}
                />
                <CustomSelectFilter
                    name='rating'
                    dataList={ratings}
                    setPage={setPage}
                    activeClick={activeFilter}
                    changeActiveFilter={setActiveFilter}
                />
                <CustomSelectFilter
                    name='price'
                    activeClick={activeFilter}
                    setPage={setPage}
                    changeActiveFilter={setActiveFilter}
                    type='input'
                />
                <CustomSelectFilter
                    name='sort'
                    dataList={sortList}
                    activeClick={activeFilter}
                    setPage={setPage}
                    changeActiveFilter={setActiveFilter}
                    type='option'
                />
            </div>
            <div className='grid grid-cols-4 gap-3 -ml-[10px] w-[calc(100%+20px)] max-h-full overflow-y-auto'>
                {productList?.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </div>
            {productList?.length === 0 && (
                <div className='capitalize font-semibold text-2xl mt-5 min-h-[350px] text-center'>
                    Not found product!
                </div>
            )}
            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}
                isLoadFirst={isLoadFirst}
                setLoadFirst={setLoadFirst}
            />
        </div>
    )
}

export default memo(Products)
