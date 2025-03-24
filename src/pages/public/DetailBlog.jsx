import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogDetail, likeOrDislikeBlog, updateView } from '../../apis/blog'
import SkeletonBlogDetail from '../../components/skeleton/SkeletonBlogDetail'

let interval = null

const DetailBlog = () => {
    const params = useParams()
    const {current} = useSelector(state => state.user)
    let time = 0

    const [blog, setBlog] = useState(null)

    const fetchBlogDetail = async() => {
        const res = await getBlogDetail(params.id)
        setTimeout(() => {
            if(res.success){
                setBlog(res.data)
            }
        }, 0)
    }

    // const fetchUpdateView = async() => {
    //     await updateView(params.id)
    // }

    const fetchUpdateView = useCallback(async() => {
        await updateView(params.id)
    }, [blog])

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'auto'})
        fetchBlogDetail()
        interval = setInterval(() => {
            if(time === 10*1000){
                fetchUpdateView()
                clearInterval(interval)
            }
            else time += 1000
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const isLikeOrDislike = (name) => {
        return blog && blog[name] && blog[name].some(item => item === current?._id)
    }

    const handleLikeOrDislike = (name) => {
        likeOrDislikeBlog({blogId: blog?._id, press: name})
        fetchBlogDetail()
    }

    return (
        <div className='mt-5'>
            {blog === null ?
                <SkeletonBlogDetail/>
            :
                <>
                    <div className='text-gray-500 my-3 flex justify-between'>
                        <span>Post: {moment(blog?.createdAt).format('DD-MM-YYYY hh:mm')} {blog.createdAt !== blog.updatedAt && `(Updated at: ${moment(blog?.updatedAt).format('DD-MM-YYYY hh:mm')})`}</span>
                        <div className='flex gap-x-3'>
                            <span>View <i className="fa-regular fa-eye"></i>: {blog?.viewer}</span>
                            <span onClick={() => handleLikeOrDislike('like')}><i className={`fa-solid fa-thumbs-up cursor-pointer ${isLikeOrDislike('likes') ? 'text-main' : 'text-inherit'}`}></i>: {blog?.likes.length}</span>
                            <span onClick={() => handleLikeOrDislike('dislike')}><i className={`fa-solid fa-thumbs-down cursor-pointer ${isLikeOrDislike('dislikes') ? 'text-main' : 'text-inherit'}`}></i>: {blog?.dislikes.length}</span>
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
