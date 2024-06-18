import React, { useEffect, useState } from 'react'
import { getBlogDetail } from '../../apis/blog'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import BlogDetail from '../../components/skeleton/BlogDetail'
import moment from 'moment'

const DetailBlog = () => {
    const params = useParams()
    const [blog, setBlog] = useState(null)

    const fetchBlogDetail = async() => {
        const res = await getBlogDetail(params.id)
        setTimeout(() => {
            if(res.success){
                setBlog(res.data)
            }
        }, 500)
    }

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'auto'})
        fetchBlogDetail()
    }, [])

    return (
        <div className='mt-5'>
            {blog === null ?
                <BlogDetail/>
            :
                <>
                    <div className='text-gray-500 my-3 flex justify-between'>
                        <span>Post: {moment(blog?.createdAt).format('DD-MM-YYYY hh:mm')} {blog.createdAt !== blog.updatedAt && `(Updated at: ${moment(blog?.updatedAt).format('DD-MM-YYYY hh:mm')})`}</span>
                        <div className='flex gap-x-3'>
                            <span>View <i className="fa-regular fa-eye"></i>: {blog?.viewer}</span>
                            <span><i className="fa-solid fa-thumbs-up"></i>: {blog?.likes.length}</span>
                            <span><i className="fa-solid fa-thumbs-down"></i>: {blog?.dislikes.length}</span>
                        </div>
                    </div>
                    <h1 className='text-main text-2xl font-bold'>{blog?.title}</h1>
                    <div className='mt-3' dangerouslySetInnerHTML={{__html: blog?.content}}/>
                </>
            }
        </div>
    )
}

export default DetailBlog