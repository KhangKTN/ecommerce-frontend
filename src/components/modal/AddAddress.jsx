import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addAddress, updateAddress } from '../../apis'

const classInput = 'mt-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const AddAddress = ({setModalAddress, setModalAddAddress, current}) => {
    const { register, watch, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const onSubmit = async(data) => {
        console.log(data);
        /* let res = null
        if(current) res = await updateAddress({...data, _id: current._id})
        else res = await addAddress(data)
        console.log(res);
        reset()
        setModalAddAddress(false)
        setModalAddress(true) */
    }

    useEffect(() => {
        if(current){
            reset({
                name: current?.name,
                phone: current?.phone,
                detailAddress: current?.detailAddress
            })
        }
    }, [])

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000025] backdrop-blur-sm">
            <div className="relative w-auto h-fit mx-auto max-w-3xl">
                <div className="border-[2px] border-gray-400 rounded-xl shadow-xl relative flex flex-col w-[550px] bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-xl text-red-500 font-semibold">{current ? 'Update' : 'Add New'} Address</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative p-6 flex-auto text-black">
                            <div className='grid grid-cols-2 gap-x-5'>
                                <div>
                                    <label htmlFor="">Name:</label>
                                    <input className={classInput} placeholder="" {...register("name", { required: 'This input is required' })} />
                                    {errors.name && <span className={classError}>{errors.name.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="">Phone:</label>
                                    <input type='number' placeholder='' className={classInput} {...register("phone", { required: 'This input is required' })} />
                                    {errors.phone && <span className={classError}>{errors.phone.message}</span>}
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="">Detail Address:</label>
                                <input type='text' placeholder='' className={classInput} {...register("detailAddress", { required: 'This input is required' })} />
                                {errors.detailAddress && <span className={classError}>{errors.detailAddress.message}</span>}
                            </div>
                            <div className='mt-5 flex w-fit gap-x-3'>
                                <input type='checkbox' id='isDefault' {...register("isDefault")} />
                                <label htmlFor='isDefault' className='select-none cursor-pointer'>Set as default</label>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-3 px-4 py-3 justify-end border-t border-solid rounded-b">
                            <button
                                className="border-2 border-gray-500 text-gray-500 hover:text-white hover:bg-gray-500 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => {setModalAddAddress(false); setModalAddress(true)}}
                            >
                                Back
                            </button>
                            <button
                                className="text-main hover:text-white border-2 border-main hover:bg-main font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="submit"
                                // onClick={() => {setModalAddAddress(false)}}
                            >
                                Yes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAddress