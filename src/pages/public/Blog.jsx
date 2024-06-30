import React, { useEffect, useState } from 'react'
import { getBlogList } from '../../apis/blog'
import moment from 'moment'
import { Link, NavLink, Outlet, createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import path from '../../utils/path'
import { linkBlog } from '../../utils/contants'
import Debounce from '../../hooks/Debounce'

const actClass = 'border-b-[3px] border-main text-main text-lg font-semibold'
const noActClass = 'text-lg font-semibold hover:border-b-[3px] hover:border-main'

const Blog = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [search, setSearch] = useState('')
    const [isLoadFirst, setIsLoadFirst] = useState(true)

    const debounceSearch = Debounce(search, 300)

    useEffect(() => {
        if(search.trim().length === 0 && search.includes(' ')) return
        if(!isLoadFirst){
            let paramSearch = {}
            if(search) paramSearch.s = search
            navigate({
                pathname: `${location.pathname}`,
                search: createSearchParams(paramSearch).toString()
            })
        }
    }, [debounceSearch])

    useEffect(() => {
        if(location.pathname === '/blogs') navigate(`/${path.BLOGS}/${linkBlog[0].value}`)
    }, [])

    return (
        <>
            <div className='flex justify-between items-center mt-5'>
                <div className="max-w-md w-[300px]">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => {setSearch(e.target.value); isLoadFirst && setIsLoadFirst(false)}} value={search} type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900 rounded-full bg-gray-200 " placeholder="Search blogs..."/>
                    </div>
                </div>
                <div className='flex gap-x-5 justify-center'>
                    {linkBlog.map(item => (
                        <NavLink key={item.id} to={search.trim().length === 0 ? `/blogs/${item.value}` : `/blogs/${item.value}?s=${search}` } className={({isActive}) => isActive ? actClass : noActClass}>{item.text}</NavLink> 
                    ))}
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default Blog