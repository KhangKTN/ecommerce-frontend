import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getBlogList } from '../apis/blog'
import { getObjectSearchParam } from '../utils/helpers'
import Pagination from './pagination/Pagination'
import SkeletonBlogList from './skeleton/SkeletonBlogList'

const BlogList = () => {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [blogList, setBlogList] = useState(null)
    const category = location.pathname.split('/')[2]
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    const fetchBlogList = async () => {
        let queries = getObjectSearchParam(searchParams)
        if (queries.page) queries.page = +queries.page - 1
        const res = await getBlogList({ category, ...queries })
        if (res.success) setCount(res.data.length)
        setTimeout(() => {
            if (res?.success) {
                setBlogList(res.data)
                setMaxPage(res.maxPage)
            }
            window.scrollTo({ top: 0 })
        }, 500)
    }

    useEffect(() => {
        setBlogList(null)
        fetchBlogList()

        const queries = getObjectSearchParam(searchParams)
        if (queries.page) setPage(queries.page - 1)
    }, [location])

    useEffect(() => {
        let query = getObjectSearchParam(searchParams)
        if (page !== 0) query.page = page + 1
        else delete query['page']
        navigate({
            pathname: `${location.pathname}`,
            search: createSearchParams(query).toString()
        })
    }, [page])

    return (
        <div>
            {blogList === null ? (
                <SkeletonBlogList count={count} />
            ) : (
                <>
                    <div className='grid grid-cols-3 gap-x-5 gap-y-8 mt-10'>
                        {blogList?.map(item => (
                            <div
                                className='rounded-lg border-[1px] shadow-md overflow-hidden flex flex-col cursor-pointer group'
                                key={item?._id}
                            >
                                <div className='overflow-hidden'>
                                    <img
                                        className='rounded-t-lg group-hover:scale-110 transition-all'
                                        src={item?.images}
                                        alt=''
                                    />
                                </div>
                                <div className='p-2 h-max flex flex-auto flex-col justify-between font-medium'>
                                    <Link to={`/blog/${item?.slug}/${item?._id}`}>
                                        <h1 className='hover:text-main font-semibold text-xl'>{item?.title}</h1>
                                    </Link>
                                    <div className='text-gray-500 mt-3 flex justify-between'>
                                        <span>Post: {moment(item?.createdAt).format('DD-MM-YY hh:mm')}</span>
                                        <div className='flex gap-x-3'>
                                            <span>
                                                <i className='fa-regular fa-eye'></i>: {item?.viewer}
                                            </span>
                                            <span>
                                                <i className='fa-solid fa-thumbs-up'></i>: {item?.likes.length}
                                            </span>
                                            <span>
                                                <i className='fa-solid fa-thumbs-down'></i>: {item?.dislikes.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mx-auto w-fit'>
                        <Pagination page={page} maxPage={maxPage} setPage={setPage} />
                    </div>
                </>
            )}
            {blogList?.length === 0 && <h1 className='text-xl text-center font-semibold'>No articles found!</h1>}
        </div>
    )
}

export default BlogList
