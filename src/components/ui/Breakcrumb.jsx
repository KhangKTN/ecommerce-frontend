import React from 'react'
import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const Breakcrumb = ({ category, name }) => {
    const routes = [
        { path: '/:category', breadcrumb: category },
        { path: '/', breadcrumb: 'Home' },
        {
            path: '/:category/:id/:name',
            breadcrumb: name
        }
    ]
    let breadcrumbs = useBreadcrumbs(routes)
    breadcrumbs = breadcrumbs.filter((e) => e.match?.route)
    const size = breadcrumbs.length - 1

    return (
        <div className='flex'>
            {breadcrumbs.map(({ match, breadcrumb }, index) => (
                <div key={index} className='text-gray-600 font-semibold'>
                    {index < size ? (
                        <NavLink className='hover:text-main' to={match.pathname}>
                            {breadcrumb}
                        </NavLink>
                    ) : (
                        <span className='text-gray-900 cursor-default'>{breadcrumb} </span>
                    )}
                    {index < size && (
                        <span className='mx-2'>
                            <i className='fa-solid fa-angle-right'></i>
                        </span>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Breakcrumb
