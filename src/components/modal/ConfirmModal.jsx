import React from 'react'

const ConfirmModal = ({title, content, name, data, setShowModal, setCurrent, handleClick}) => {
    return (
        <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit mt-10 mx-auto max-w-3xl">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl relative flex flex-col w-full min-w-[350px] bg-white outline-none focus:outline-none animate-slide-in-top">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-xl text-red-500 font-semibold">{title}</h3>
                        <button onClick={() => {setShowModal(false); setCurrent(null)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto text-black">
                        {content}
                    </div>
                    <div className="flex items-center gap-x-3 px-4 py-3 justify-end border-t border-solid rounded-b">
                        <button
                            className="border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => {setShowModal(false); setCurrent(null)}}
                        >
                            No
                        </button>
                        <button
                            className="text-main hover:text-white border-2 border-main hover:bg-main font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => {setShowModal(false); handleClick(name, data)}}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal