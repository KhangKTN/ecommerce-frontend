import React from 'react'

const SkeletonDetailProduct = () => {
    return (
        <div>
            <div className="h-8 my-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
            <div role="status" className="gap-x-10 animate-pulse duration-500 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex">
                <div className='flex flex-col gap-y-3'>
                    <div className="w-[460px] h-[460px] flex items-center justify-center bg-gray-200 rounded-md sm:w-96 dark:bg-gray-700">
                        {/* <svg className="w-[460px] h-[460px] text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg> */}
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 dark:bg-gray-700">
                        <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                        <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                        <svg className="text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                </div>
                <div className="w-full">
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[350px] mb-10"></div>
                    <div className='flex gap-x-3 mt-5 my-10'>
                        <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px]'></div>
                        <div className='bg-gray-500 mx-3 w-[1px]'></div>
                        <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px]'></div>
                    </div>
                    {Array.from(Array(10)).map((item, index) => (
                        <div key={index} className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
                    ))

                    }
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
                    <div className='mt-10 flex gap-x-5 items-center'>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px]"></div>
                        <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-[200px]"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px]"></div>
                    </div>
                    <div className="flex gap-x-3 mt-10">
                        <div className="h-14 bg-gray-200 rounded-md dark:bg-gray-700 w-[200px]"></div>
                        <div className="h-14 bg-gray-200 rounded-md dark:bg-gray-700 w-[200px]"></div>
                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default SkeletonDetailProduct