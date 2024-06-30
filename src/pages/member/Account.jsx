import React, { useEffect } from 'react'
import { memberNavLink } from '../../utils/contants'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'

const activeClass = 'px-4 py-3 bg-main text-white rounded-e-full'
const notActClass = 'px-4 py-3 hover:text-main bg-gray-100 hover:bg-gray-200 text-main rounded-e-full'

const Account = () => {
    const navigate = useNavigate()
    const {current, isLoggedIn} = useSelector(state => state.user)

    useEffect(() => {
        if(!isLoggedIn) navigate(`/${path.HOME}`)
    }, [isLoggedIn])

    return (
        <div className='flex gap-x-10 min-h-[500px] mt-5'>
            <div className='flex flex-col gap-y-1 w-1/5 max-h-[500px] bg-gray-50 pr-3 pl-1 py-10 rounded-e-md text-lg font-semibold'>
                {memberNavLink.map(item => (
                    <NavLink className={({isActive}) => isActive ? activeClass : notActClass} key={item.id} to={item.path}>
                        {item.icon}
                        {item.text}
                    </NavLink>
                ))}
            </div>
            <div className='flex-auto border rounded-md p-5'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Account