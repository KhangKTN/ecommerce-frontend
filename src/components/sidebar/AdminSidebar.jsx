import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from '../../utils/path'
import { adminSidebar } from '../../utils/contants'

const classAct = 'py-3 px-4 flex items-center gap-x-4 cursor-pointer bg-zinc-700 text-main rounded-md'
const classNotAct = 'py-3 px-4 flex items-center gap-x-4 hover:rounded-md cursor-pointer hover:bg-zinc-700 hover:text-main'

const AdminSidebar = () => {
    const [activeBar, setActiveBar] = useState(null)
    const [subActive, setSubActive] = useState(null)

    const handleActiveParent = (id) => {
        if(activeBar === id) setActiveBar(null)
        else setActiveBar(id)
    }

    const handleActiveSub = (id) => {
        setSubActive(id)
    }

    return (
        <div className='py-3 px-5 bg-zinc-500 min-h-full'>
            <div className='text-3xl w-fit mx-auto px-4'>
                <Link to={`/${path.HOME}`}>
                    <span className='font-bold text-main'>&lt;Khang/></span>
                    <span className='font-bold text-white'> Shop</span>
                </Link>
            </div>
            <div className='text-white text-xl mt-10'>
                {adminSidebar.map((item, index, list) => (
                    <>
                    {item.type === 'single' ?
                        <>
                            <NavLink to={item.path} key={item.id} className={({isActive}) => isActive ? classAct : classNotAct}>
                                <div className='min-w-8 flex justify-center'>
                                    <i className={`${item.iconClassName} mx-auto`}></i>
                                </div>
                                <span>{item.text}</span>
                            </NavLink>
                        </>
                        :
                        <>
                            <Link key={item.id} onClick={() => handleActiveParent(item.id)} className={'flex flex-col'}>
                                <div className='py-3 px-4 flex items-center gap-x-4 hover:rounded-md cursor-pointer hover:bg-zinc-700 hover:text-main'>
                                    <div className='min-w-8 flex justify-center'>
                                        <i className={`${item.iconClassName} mx-auto`}></i>
                                    </div>
                                    <span>{item.text}</span>
                                    <i className={'ml-auto ' + (item.id === activeBar ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down")}></i>
                                </div>
                                {item.id === activeBar &&
                                    <ul className='list-disc pl-12 text-lg capitalize'>
                                        {item.submenu.map((item, index, sub) => (
                                            <>
                                                <NavLink to={item.path} key={item.id} onClick={e => {e.stopPropagation(); handleActiveSub(item.id)}} className={({isActive}) => isActive ? classAct : classNotAct}>
                                                    <i className={subActive === item.id ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle-dot'}></i>
                                                    <span className={''}>{item.text}</span>
                                                </NavLink>
                                                {index < sub.length - 1 && <div className='bg-gray-400 h-[1px] w-[85%] mx-auto'></div>}
                                            </>
                                        ))}
                                    </ul>
                                }
                            </Link>
                        </>}
                        {index < list.length - 1 && <div className='bg-gray-400 h-[1px] w-[85%] mx-auto'></div>}
                    </>
                ))}
            </div>

        </div>
    )
}

export default AdminSidebar