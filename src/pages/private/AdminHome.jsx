import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header, TopHeader } from '../../components'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../app/asyncActionUser'
import path from '../../utils/path'
import AdminSidebar from '../../components/sidebar/AdminSidebar'

const AdminHome = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {current, isLoggedIn} = useSelector(state => state.user)

    useEffect(() => {
        if(!isLoggedIn || (current && current?.role != 1963)) navigate(`/${path.HOME}`)
    }, [current])

    return (
        <div>
            <TopHeader/>
            <div className='flex relative max-h-[calc(100vh-64px)]'>
                <div className='flex-auto min-h-[calc(100vh-64px)]'>
                    <AdminSidebar/>
                </div>
                <div className='w-[80%] p-10 overflow-y-auto'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminHome