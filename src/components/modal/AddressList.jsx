import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddAddress from './AddAddress'
import { getCurrentUser } from '../../app/asyncActionUser'
import {getProvinceByCode, getDistrictByCode, getWardByCode} from 'vn-local-plus'

const AddressList = ({address, setAddress, setModalAddress, setModalAddAddress, setModalUpdateAddress, setCurrentEdit}) => {
    const {current} = useSelector(state => state.user)
    const dispatcher = useDispatch() 
    
    const [currentAddress, setCurrentAddress] = useState(address)

    const handleUpdate = (item) => {
        setModalAddress(false)
        setModalUpdateAddress(true)
        setCurrentEdit(item)
    }

    useEffect(() => {
        setCurrentAddress(address)
    }, [address])

    const localAddressToString = (address) => {
        const localAddress = address?.split(',')
        if(!localAddress) return ''
        return `${getProvinceByCode(localAddress[0]).name}, ${getDistrictByCode(localAddress[1]).name}, ${getWardByCode(localAddress[2]).name}`
    }

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit mt-10 mx-auto max-w-3xl">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl relative flex flex-col w-full min-h-[600px] min-w-[500px] bg-white outline-none focus:outline-none animate-slide-in-top">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-xl text-red-500 font-semibold">My Address</h3>
                    </div>
                    <div className="relative px-3 flex-auto text-black">
                        <div className='my-3'>
                            {current?.address.map(item => (
                                <div key={item._id} className='hover:bg-gray-100 rounded-md p-3 flex flex-col border-b-[1px]'>
                                    <div className='flex gap-x-3 items-center mb-2'>
                                        <span onClick={() => setCurrentAddress(item)} className='text-main cursor-pointer'><i className={item._id === currentAddress?._id ? 'fa-solid fa-circle-dot ' : 'fa-regular fa-circle'}></i></span>
                                        <h1 className='text-lg font-semibold'>{item.name}</h1>
                                        <span className='border-l-[1px] border-gray-400 pl-3'>{item.phone}</span>
                                        <span className='text-main font-medium ml-auto cursor-pointer hover:underline' onClick={() => handleUpdate(item)}>Update</span>
                                    </div>
                                    <span className='text-gray-500'>{`${localAddressToString(item.localAddress)}, ${item.detailAddress}`}</span>
                                    {item.isDefault && <span className='border-[1px] border-main w-fit px-2 py-1 rounded'>Default</span>}
                                </div>
                            ))}
                        </div>
                        <button className='border-2 text-main font-medium border-main px-4 py-2 rounded' onClick={() => {setModalAddress(false); setModalAddAddress(true)}}><i className="fa-solid fa-plus mr-3"></i>Add new address</button>
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
                            onClick={() => {setModalAddress(false); setAddress(currentAddress)}}
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