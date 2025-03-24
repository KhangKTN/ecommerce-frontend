import React from 'react'

const CountdownLabel = ({ label, value }) => {
    return (
        <div className='bg-gray-200 p-2 rounded-md'>
            <span className='font-bold text-xl animate-countdown-animation'>{value}</span> <br />
            <span className='font-light'>{label}</span>
        </div>
    )
}

export default CountdownLabel
