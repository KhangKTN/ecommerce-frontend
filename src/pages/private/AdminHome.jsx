import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { AdminSidebar, TopHeader } from '../../components/layout'
import path from '../../utils/path'

const AdminHome = () => {
    const navigate = useNavigate()
    const { current, isLoggedIn } = useSelector((state) => state.user)

    useEffect(() => {
        if (!isLoggedIn || (current && current?.role != 1963)) navigate(`/${path.HOME}`)
    }, [current])

    return (
        <main>
            <TopHeader />
            <div className='flex relative max-h-[calc(100vh-64px)]'>
                <div className='flex-auto min-h-[calc(100vh-64px)]'>
                    <AdminSidebar />
                </div>
                <div className='w-[80%] p-10 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default AdminHome
