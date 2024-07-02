import React, { useState } from 'react'
import Rating from './Rating'

const Votebar = ({value, voted, totalVote}) => {
    const [voteSelected, setVoteSelected] = useState(0)

    return (
        <div className='flex gap-x-20 items-center py-1 px-5 cursor-pointer'>
            <Rating rating={value + 1} />
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-main h-2.5 rounded-full" style={{width: totalVote === 0 ? '0' : `${voted / totalVote * 100}%`}}></div>
            </div>
            <span className='text-nowrap font-semibold text-lg'>{voted} rating</span>
        </div>
    )
}

export default Votebar