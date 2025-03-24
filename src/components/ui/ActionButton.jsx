import React from 'react'

const ActionButton = ({ icon, color }) => {
    return (
        <span
            className={`border-[1px] border-gray-300 rounded-full size-10 shadow-lg flex justify-center items-center ${
                color ? color : 'bg-white hover:bg-main hover:text-white'
            }`}
        >
            {icon}
        </span>
    )
}

export default ActionButton
