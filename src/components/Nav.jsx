import React, { useEffect, useState } from 'react'
import {navigation} from '../utils/contants'
import { NavLink, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import path from '../utils/path'
import Debounce from '../hooks/Debounce'
import { getObjectSearchParam } from '../utils/helpers'

const navActive = 'bg-main text-white p-3 rounded-full border-2 border-white'
const navNotActive = 'text-gray-700 border-2 border-white hover:border-main hover:border-2 p-3 rounded-full transition-all duration-300'

const Nav = () => {
    const location = useLocation()
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [isLoadFirst, setIsLoadFirst] = useState(true)

    const paramSearch = Debounce(search, 500)

    useEffect(() => {
        if(!isLoadFirst){
            const queries = getObjectSearchParam(query.entries())
            if(paramSearch){
                navigate({
                    pathname: `${path.PRODUCTS}`,
                    search: createSearchParams({
                        ...queries,
                        name: paramSearch,
                        page: 1
                    }).toString()
                })
            }
            else{
                if(location.pathname === path.PUBLIC) navigate('/')
                else{
                    delete queries['name']
                    navigate({
                        pathname: `/${path.PRODUCTS}`,
                        search: createSearchParams({...queries}).toString()
                    })
                }
            }
        }
    }, [paramSearch])

    return (
        <div className='py-3 flex justify-between items-center border-b-[1px] border-gray-200'>
            <div className='flex gap-x-5 items-center uppercase text-lg font-bold'>
                {navigation?.map(e => (
                    <NavLink to={e.path} key={e.id} className={({isActive}) => isActive ? navActive : navNotActive}>
                        {e.value}
                    </NavLink>
                ))}
            </div>
            <div>
                <div className="max-w-md w-[300px] mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => {setSearch(e.target.value); isLoadFirst && setIsLoadFirst(false)}} value={search} type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Type something..." required />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav