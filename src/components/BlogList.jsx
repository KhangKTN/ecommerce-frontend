import React, { useEffect, useState } from 'react'
import { getBlogList } from '../apis/blog'
import moment from 'moment'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { linkBlog } from '../utils/contants'
import SkeletonBlogList from './skeleton/SkeletonBlogList'

const BlogList = () => {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    
    const [blogList, setBlogList] = useState(null)
    const category = location.pathname.split('/')[2]
    const [count, setCount] = useState(0)

    const fetchBlogList = async() => {
        const res = await getBlogList({category, search: searchParams.get('s')})
        if(res.success) setCount(res.data.length)
        console.log(res);
        setTimeout(() => {
            if(res?.success){
                setBlogList(res.data)
            }
        }, 500);
    }

    useEffect(() => {
        setBlogList(null)
        fetchBlogList()
    }, [location])

    return (
        <div>
            {blogList === null ?
                <SkeletonBlogList count={count}/>
                :
                <div className='grid grid-cols-3 gap-x-5 gap-y-8 mt-10'>
                    {blogList?.map(item => (
                        <div className='rounded-lg border-[1px] shadow-md overflow-hidden flex flex-col cursor-pointer group' key={item?._id}>
                            <div className='overflow-hidden'>
                                <img className='rounded-t-lg group-hover:scale-110 transition-all' src={item?.images} alt="" />
                            </div>
                            <div className='p-2 h-max flex flex-auto flex-col justify-between font-medium'>
                                <Link to={`/blog/${item?.slug}/${item?._id}`}><h1 className='hover:text-main font-semibold text-xl'>{item?.title}</h1></Link>
                                <div className='text-gray-500 mt-3 flex justify-between'>
                                    <span>Post: {moment(item?.createdAt).format('DD-MM-YY hh:mm')}</span>
                                    <div className='flex gap-x-3'>
                                        <span><i className="fa-regular fa-eye"></i>: {item?.viewer}</span>
                                        <span><i className="fa-solid fa-thumbs-up"></i>: {item?.likes.length}</span>
                                        <span><i className="fa-solid fa-thumbs-down"></i>: {item?.dislikes.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {blogList?.length === 0 && <h1 className='text-xl text-center font-semibold'>No articles found!</h1>}
        </div>
    )
}

export default BlogList