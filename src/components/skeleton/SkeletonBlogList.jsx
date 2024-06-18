import React from 'react'

const SkeletonBlogList = ({count}) => {
    return (
        <div className='grid grid-cols-3 gap-x-5 gap-y-8 mt-5 animate-pulse duration-500'>
            {Array.from(Array(count)).map((item, index) => (
                <div className='rounded-lg border-[1px] h-[380px] shadow-md overflow-hidden flex flex-col cursor-pointer group' key={index}>
                    <div className='h-[200px] bg-gray-200'>
                    </div>
                    <div className='p-2 h-max flex flex-auto flex-col justify-between font-medium'>
                        <div className='h-16 bg-gray-300 rounded-3xl w-full'></div>
                        <div className='mt-3 flex justify-between'>
                            <div className='w-1/3 h-6 rounded-full bg-gray-300'></div>
                            <div className='w-1/3 h-6 rounded-full bg-gray-300'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonBlogList