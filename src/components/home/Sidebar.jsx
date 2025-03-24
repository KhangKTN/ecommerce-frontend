import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const itemActive = 'block py-[15px] px-5 bg-gray-200 hover:cursor-pointer text-lg text-main'
const itemNotActive = 'block py-[12px] px-5 hover:text-main hover:bg-gray-200 hover:cursor-pointer text-lg'

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app)

    return (
        <div className='border-[1px] h-fit border-gray-300 rounded-md overflow-hidden'>
            <div className='uppercase py-[15px] px-5 bg-main text-white font-semibold'>
                <i className='fa-solid fa-list mr-3'></i>All Collection
            </div>
            {categories?.map((item, index) => (
                <NavLink
                    key={item._id}
                    className={({ isActive }) => (isActive ? itemActive : itemNotActive)}
                    to={item.name.toLowerCase()}
                >
                    <div>{item?.name}</div>
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar
