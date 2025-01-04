import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getUserList, updateUserByAdmin } from '../../apis/user'
import ConfirmModal from '../../components/modal/ConfirmModal'
import Pagination from '../../components/pagination/Pagination'
import TitleText from '../../components/style/TitleText'
import Debounce from '../../hooks/Debounce'

const ManageUser = () => {
    const refSelect = useRef()

    const [sort, setSort] = useState(null)
    const [select, setSelect] = useState([])
    const [search, setSearch] = useState('')
    const [userList, setUserList] = useState(null)
    const [isLoadFirst, setIsLoadFirst] = useState(true)

    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [isShowModal, setModalShow] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [isShowModalRole, setModalShowRole] = useState(false)

    const fetchDataUser = async query => {
        const res = await getUserList(query)
        if (res.success) {
            setUserList(null)
            if (sort) {
                setUserList([...sortData(sort?.includes('-') ? '-' : '', res.data)])
            } else setUserList(res.data)
            setMaxPage(Math.ceil(res.count / 6))
        }
    }

    const handleClickCheckbox = async id => {
        if (select?.includes(id)) setSelect(select?.filter(item => item !== id))
        else setSelect(prev => [...prev, id])
    }

    const handleSort = value => {
        setUserList([...sortData(sort?.includes('-') ? '' : '-', userList)])
        setSort(prev => (prev?.includes('-') ? value : '-' + value))
    }

    const handleBlock = async (name, data) => {
        console.log(name, data)
        const dataUpdate = {
            _id: currentUser._id,
            [name]: data
        }
        const res = await updateUserByAdmin(dataUpdate)
        if (res.success) {
            toast.success(res.message)
            fetchDataUser({ name: search, page })
        }
    }

    const sortData = (type, data) => {
        console.log('check type:', type)
        if (type === '-') {
            data?.sort((a, b) => b.firstname.localeCompare(a.firstname))
        } else {
            data?.sort((a, b) => a.firstname.localeCompare(b.firstname))
        }
        return data
    }

    const deboundSearch = Debounce(search, 500)

    useEffect(() => {
        if (page !== 0) setPage(0)
        else fetchDataUser({ name: search, page: 0 })
    }, [deboundSearch])

    useEffect(() => {
        if (!isLoadFirst) fetchDataUser({ name: search, page })
    }, [page])

    useEffect(() => {
        if (!isLoadFirst) {
            setUserList(null)
            fetchDataUser()
        }
    }, [currentUser])

    return (
        <>
            <TitleText text={'User List'} />
            <div className='sm:rounded-lg'>
                <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900'>
                    <label for='table-search' className='sr-only'>
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                        <input
                            type='search'
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                                isLoadFirst && setIsLoadFirst(false)
                            }}
                            className='block py-2 ps-10 pe-2 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-main dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search by name, email, mobile...'
                        />
                    </div>
                </div>
            </div>
            <div className='relative overflow-x-auto rounded-md'>
                <table className='table-auto w-full text-sm text-left shadow-lg overflow-hidden rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm select-none text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-3 py-4'>
                                <div className='flex items-center'>
                                    <input
                                        checked={select.length === userList?.length && userList?.length !== 0}
                                        onClick={() =>
                                            setSelect(
                                                select.length === userList.length ? [] : userList?.map(item => item._id)
                                            )
                                        }
                                        id='checkbox-all-search'
                                        type='checkbox'
                                        className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
                                    />
                                    <label for='checkbox-all-search' className='sr-only'>
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th
                                title='Click to sort by name'
                                onClick={() => handleSort('name')}
                                scope='col'
                                className='px-6 py-4 flex justify-between items-center cursor-pointer'
                            >
                                <span>Name</span>
                                {sort === `-name` && <span className='text-base'>&#8744;</span>}
                                {sort === `name` && <span className='text-base'>&#8743;</span>}
                                {/* {sort.includes('-') ? '&#9013;' : '&#8963;'} */}
                            </th>
                            <th scope='col' className='px-6 py-4 truncate'>
                                Email
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Mobile
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.map(item => (
                            <tr
                                key={item._id}
                                className='bg-white text-base border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                            >
                                <td className='w-4 pl-3'>
                                    <div className='flex items-center'>
                                        <input
                                            onClick={() => handleClickCheckbox(item._id)}
                                            checked={select?.includes(item._id)}
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
                                        className='w-10 h-10 rounded-full'
                                        src='https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
                                        alt='images'
                                    />
                                    <div className='ps-3'>
                                        <div className='text-base font-semibold'>{`${item.firstname} ${item.lastname}`}</div>
                                        {/* <div className="font-normal text-gray-500">{item.role == 1963 ? 'Admin' : 'User'}</div> */}
                                        <select
                                            ref={refSelect}
                                            className='text-pink-400'
                                            onChange={e => {
                                                setCurrentUser(item)
                                                setModalShowRole(true)
                                                isLoadFirst && setIsLoadFirst(false)
                                            }}
                                        >
                                            <option selected={item.role == 1963} value='1963'>
                                                Admin
                                            </option>
                                            <option selected={item.role == 2002} value='2002'>
                                                User
                                            </option>
                                        </select>
                                    </div>
                                </th>
                                <td className='px-6 py-4'>{item.email}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>{item.mobile}</div>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>
                                        <div
                                            className={
                                                'h-2.5 w-2.5 rounded-full me-2 ' +
                                                (item.isBlocked ? 'bg-red-500' : 'bg-green-500')
                                            }
                                        ></div>{' '}
                                        {item.isBlocked ? 'Blocked' : 'Active'}
                                    </div>
                                </td>
                                <td
                                    onClick={() => {
                                        setCurrentUser(item)
                                        setModalShow(true)
                                        isLoadFirst && setIsLoadFirst(false)
                                    }}
                                    className='pr-3'
                                >
                                    <button
                                        className={
                                            'px-5 py-2 rounded text-white min-w-[90px] ' +
                                            (item.isBlocked ? 'bg-yellow-500' : 'bg-red-500')
                                        }
                                    >
                                        {item.isBlocked ? 'Unlock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} maxPage={maxPage} setPage={setPage} setIsLoadFirst={setIsLoadFirst} />
            {isShowModal && (
                <ConfirmModal
                    title={`Confirm ${currentUser?.isBlocked ? 'unlock' : 'block'} user?`}
                    content={`Are you sure you want to ${currentUser?.isBlocked ? 'unlock' : 'block'} the user: ${
                        currentUser?.email
                    }?`}
                    setShowModal={setModalShow}
                    setCurrent={setCurrentUser}
                    handleClick={handleBlock}
                    name={'isBlocked'}
                    data={!currentUser.isBlocked}
                />
            )}
            {isShowModalRole && (
                <ConfirmModal
                    title={`Confirm change role user?`}
                    content={`Are you sure you want to change role ${
                        currentUser?.role == 1963 ? 'User' : 'Admin'
                    } the user: ${currentUser?.email}?`}
                    setShowModal={setModalShowRole}
                    setCurrent={setCurrentUser}
                    handleCancel={setCurrentUser}
                    handleClick={handleBlock}
                    name={'role'}
                    data={currentUser.role == 1966 ? '2002' : '1966'}
                />
            )}
        </>
    )
}

export default ManageUser
