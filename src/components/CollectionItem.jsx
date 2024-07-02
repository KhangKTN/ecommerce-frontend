import React, { memo } from 'react'
import { Link } from 'react-router-dom';

const CollectionItem = ({collection}) => {
    return (
        <Link to={`/${collection?.name.toLowerCase()}`} className='p-4 border-[2px] flex gap-x-5 rounded-md cursor-pointer hover:border-[#5bbcff] hover:border-2'>
            <img className='basis-1/2 h-[150px]' src={collection?.thumbnail} alt="" />
            <div>
                <h1 className='text-lg font-semibold'>{collection.name}</h1>
                <ul className='ml-4 mt-3'>
                    {collection?.brand.map((item, index) => (
                        <li className='list-disc text-gray-500' key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </Link>
    )
}

export default memo(CollectionItem)