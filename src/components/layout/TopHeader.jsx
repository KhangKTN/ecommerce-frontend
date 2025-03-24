import Tippy from '@tippyjs/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { getCurrentUser } from '../../app/actions/userAction'
import { logout } from '../../app/slices/userSlide'
import path from '../../utils/path'
import ConfirmModal from '../modal/ConfirmModal'

const TopHeader = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { current, isLoggedIn } = useSelector((state) => state.user)

    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrentUser())
        }, 300)
        return () => clearTimeout(timeout)
    }, [dispatch, isLoggedIn])

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='px-[calc((100%-1180px+40px)/2)] py-3 bg-main flex justify-between items-center text-white font-semibold'>
            <h1>ORDER ONLINE OR CALL US (+1800) 000 8808</h1>
            <div className='flex gap-x-3 items-center'>
                {current?.role == 1963 &&
                    (location.pathname.includes(path.ADMIN) ? (
                        <Link
                            className='px-8 py-2 uppercase bg-gray-100 text-black rounded-md hover:text-main hover:bg-[#deeffc] transition-all duration-500'
                            to={path.PUBLIC}
                        >
                            Go to Guest page
                        </Link>
                    ) : (
                        <Link
                            className='px-8 py-2 uppercase bg-gray-100 text-black rounded-md hover:text-main hover:bg-[#deeffc] transition-all duration-500'
                            to={`${path.ADMIN}/${path.DASHBOARD}`}
                        >
                            <i className='fa-solid fa-lock mr-2'></i> Go to Admin page
                        </Link>
                    ))}
                {!isLoggedIn ? (
                    <Tippy className='text-main' content={<span>Login</span>}>
                        <Link
                            title='Login'
                            className='px-5 py-2 uppercase bg-gray-100 text-black rounded-md hover:text-main hover:bg-[#deeffc] transition-all duration-500'
                            to={`login?returnUri=${location.pathname.slice(1)}`}
                        >
                            <i className='fa-solid fa-right-to-bracket'></i>
                        </Link>
                    </Tippy>
                ) : (
                    <>
                        <Tippy className='text-main' content={<span>Logout</span>}>
                            <button
                                title='Logout'
                                type='button'
                                onClick={() => setIsShowModal(true)}
                                className='px-5 py-2 uppercase bg-gray-100 text-black rounded-md hover:text-red-500 hover:bg-[#deeffc] transition-all duration-500'
                            >
                                <i className='fa-solid fa-right-from-bracket'></i>
                            </button>
                        </Tippy>
                        <span>Hi, {current?.firstname}</span>
                    </>
                )}
            </div>
            {isShowModal && (
                <ConfirmModal
                    title={'Logout'}
                    content={'Do you want sure logout?'}
                    setShowModal={setIsShowModal}
                    handleClick={handleLogout}
                    setCurrent={() => {}}
                />
            )}
        </div>
    )
}

export default TopHeader
