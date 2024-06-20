import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddAddress from './AddAddress'
import { getCurrentUser } from '../../app/asyncActionUser'

const AddressList = ({setModalAddress, setModalAddAddress, setModalUpdateAddress, setCurrentEdit}) => {
    const {current} = useSelector(state => state.user)
    const dispatcher = useDispatch()
    // const []


    const handleUpdate = (item) => {
        setModalAddress(false)
        setModalUpdateAddress(true)
        setCurrentEdit(item)
    }

    useEffect(() => {
        dispatcher(getCurrentUser())
    }, [])

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit mt-10 mx-auto max-w-3xl">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl relative flex flex-col w-full min-h-[600px] min-w-[500px] bg-white outline-none focus:outline-none animate-slide-in-top">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-xl text-red-500 font-semibold">My Address List</h3>
                    </div>
                    <div className="relative p-6 flex-auto text-black">
                        <div>
                            {current?.address.map(item => (
                                <div key={item._id} className='hover:bg-gray-50 mb-2'>
                                    <div className='flex gap-x-3 items-center mb-2'>
                                        <span><i className={item.isDefault ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle-dot'}></i></span>
                                        <h1 className='text-lg font-semibold'>{item.name}</h1>
                                        <span className='border-l-[1px] pl-3'>{item.phone}</span>
                                        <span className='text-main ml-auto cursor-pointer hover:underline' onClick={() => handleUpdate(item)}>Update</span>
                                    </div>
                                    <span className='text-gray-500'>{item.detailAddress}</span>
                                </div>
                            ))}
                        </div>
                        <button className='mt-3 border-[1px] border-main px-4 py-2' onClick={() => {setModalAddress(false); setModalAddAddress(true)}}>Add new address</button>
                    </div>
                    <div className="flex items-center gap-x-3 px-4 py-3 justify-end border-t border-solid rounded-b">
                        <button
                            className="border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => {setModalAddress(false)}}
                        >
                            Cancel
                        </button>
                        <button
                            className="text-main hover:text-white border-2 border-main hover:bg-main font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => {setModalAddress(false)}}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AddressList)