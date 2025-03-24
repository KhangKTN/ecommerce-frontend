import Tippy from '@tippyjs/react'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { getBlogList } from '../../apis/blog'
import Pagination from '../../components/pagination/Pagination'
import { TitleText } from '../../components/ui'
import Debounce from '../../hooks/Debounce'
import CreateBlog from './CreateBlog'

const ManageBlog = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [blogList, setBlogList] = useState(null)
    const [search, setSearch] = useState('')
    const [isLoadFirst, setIsLoadFirst] = useState(true)
    const [currentBlog, setCurrentBlog] = useState(null)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    const fetchBlogList = async () => {
        const res = await getBlogList({ search, page })
        setTimeout(() => {
            if (res?.success) {
                setBlogList(res.data)
                setMaxPage(Math.ceil(res.count / 2))
            }
        }, 500)
    }

    const debounceSearch = Debounce(search, 300)

    useEffect(() => {
        if (search.trim().length === 0 && search.includes(' ')) return
        if (!isLoadFirst) {
            let paramSearch = {}
            if (search) paramSearch.s = search
            if (page !== 0) paramSearch.page = page + 1
            navigate({
                pathname: `${location.pathname}`,
                search: createSearchParams(paramSearch).toString()
            })
            fetchBlogList()
        }
    }, [debounceSearch, page])

    useEffect(() => {
        fetchBlogList()
    }, [])

    return (
        <div>
            <TitleText text={'Blog List'} />
            <div className='flex justify-between items-center mt-5'>
                <div className='max-w-md w-[300px]'>
                    <label
                        htmlFor='default-search'
                        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                    >
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value)
                                isLoadFirst && setIsLoadFirst(false)
                            }}
                            value={search}
                            type='search'
                            id='default-search'
                            className='block w-full px-4 py-2 ps-10 text-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900 rounded-full bg-gray-200 '
                            placeholder='Search blogs...'
                        />
                    </div>
                </div>
                {/* <div className='flex gap-x-5 justify-center'>
                    {linkBlog.map(item => (
                        <NavLink to={search.trim().length === 0 ? `/${path.ADMIN}/${path.MANAGE_BLOG}/${item.value}` : `/${path.ADMIN}/${path.MANAGE_BLOG}/${item.value}?s=${search}` } className={({isActive}) => isActive ? actClass : noActClass}>{item.text}</NavLink>
                    ))}
                </div> */}
            </div>
            <div className='mt-5 rounded-md relative overflow-y-auto overflow-hidden'>
                <table className='table-auto w-full text-sm text-left shadow-lg overflow-hidden rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm select-none text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-3 py-4'>
                                <div className='flex items-center'>
                                    <input
                                        onClick={() => {}}
                                        id='checkbox-all-search'
                                        type='checkbox'
                                        className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
                                    />
                                    <label for='checkbox-all-search' className='sr-only'>
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope='col' className='px-6 py-4 truncate'>
                                Thumbnail
                            </th>
                            <th
                                title='Click to sort by name'
                                onClick={() => {}}
                                scope='col'
                                className='px-6 py-4 flex justify-between items-center cursor-pointer'
                            >
                                <span>Title</span>
                            </th>
                            <th scope='col' className='px-6 py-4 truncate'>
                                View
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Like
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Dislike
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogList?.map((item) => (
                            <tr
                                key={item._id}
                                className='bg-white text-base border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                            >
                                <td className='w-4 pl-3'>
                                    <div className='flex items-center'>
                                        <input
                                            onClick={() => {}}
                                            id='checkbox-table-search-1'
                                            type='checkbox'
                                            className='w-4 h-4 border-gray-300 rounded focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                                        />
                                        <label for='checkbox-table-search-1' className='sr-only'>
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope='row'
                                    className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                    <img
                                        className='w-20 h-14 object-contain rounded-md'
                                        src={item.images}
                                        alt=''
                                    />
                                </th>
                                <td className='px-6 py-4'>{item?.title}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>{item?.viewer}</div>
                                </td>
                                <td className='px-6 py-4 truncate'>{item.likes.length}</td>
                                <td className='px-6 py-4'>{item.dislikes.length}</td>
                                <td className='pr-3'>
                                    <div className='flex gap-x-3'>
                                        <Tippy className='text-main bg-gray-700' content={<span>Edit blog</span>}>
                                            <button
                                                onClick={() => {
                                                    setCurrentBlog(item)
                                                }}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                                                }
                                            >
                                                <i className='fa-solid fa-file-pen'></i>
                                            </button>
                                        </Tippy>
                                        <Tippy className='text-main bg-gray-700' content={<span>Delete blog</span>}>
                                            <button
                                                onClick={() => {}}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                                }
                                            >
                                                <i className='fa-regular fa-trash-can'></i>
                                            </button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} maxPage={maxPage} setPage={setPage} setIsLoadFirst={setIsLoadFirst} />
            {currentBlog && (
                <>
                    <div className='mx-auto my-10 w-[80%] h-[1px] bg-gray-300'></div>
                    <CreateBlog isEdit={true} blog={currentBlog} handleReload={fetchBlogList} />
                </>
            )}
        </div>
    )
}

export default ManageBlog
