import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addAddress, updateAddress } from '../../apis'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../app/asyncActionUser'
import {getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode} from 'vn-local-plus'

const classInput = 'mt-2 shadow-sm bg-gray-100 text-gray-900 text-sm rounded-full focus:outline-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const classError = 'text-red-500'

const AddAddress = ({setModalAddress, setModalAddAddress, current, setIsLoadFirst}) => {
    const { register, watch, handleSubmit, reset, setValue, formState: { errors } } = useForm()
    const dispatcher = useDispatch()

    const [localAddress, setLocalAddress] = useState({province: '', district: '', ward: ''})
    const [provinces, setProvinces] = useState([])
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])

    const [checked, setChecked] = useState(current?.isDefault)

    const onSubmit = async(data) => {
        let res = null
        if(current) res = await updateAddress({...data, _id: current._id, localAddress})
        else res = await addAddress({...data, localAddress})
        dispatcher(getCurrentUser())
        reset()
        setModalAddAddress(false)
        setModalAddress(true)
        setIsLoadFirst(false)
    }

    const defaultLocalAddress = (address) => {
        const defaultProvince = address ? address?.province : '01'
        setProvinces(getProvinces())
        const districtList = getDistrictsByProvinceCode(defaultProvince)
        setDistrict(districtList)
        const wardList = getWardsByDistrictCode(address ? address?.district : districtList[0].code)
        setWards(wardList)
        if(address) setLocalAddress({...address})
        else setLocalAddress({
            province: defaultProvince, 
            district: districtList[0].code, 
            ward: wardList[0].code
        })
    }

    useEffect(() => {
        if(current){
            const addressSplit = current.localAddress?.split(',')
            const addressObj = {province: addressSplit[0], district: addressSplit[1], ward: addressSplit[2]}
            defaultLocalAddress(addressObj)
            reset({
                name: current?.name,
                phone: current?.phone,
                detailAddress: current?.detailAddress
            })
        }
        else defaultLocalAddress()
    }, [])

    const handleChangeProvince = (name, value) => {
        const districtList = getDistrictsByProvinceCode(value)
        setDistrict(districtList)
        const wardList = getWardsByDistrictCode(districtList[0].code)
        setWards(wardList)
        setLocalAddress(prev => ({...prev, [name]: value, district: districtList[0].code, ward: wardList[0].code}))
    }

    const handleChangeDistrict = (name, value) => {
        const wardList = getWardsByDistrictCode(value)
        setWards(wardList)
        setLocalAddress(prev => ({...prev, [name]: value, ward: wardList[0].code}))
    }

    console.log(localAddress);

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
                            <div className='grid grid-cols-3 gap-x-3 mt-5'>
                                <select onChange={({target: {name, value}}) => handleChangeProvince(name, value)} className={`${classInput} max-h-full`} name='province' id="">
                                    {provinces?.map(item => (
                                        <option selected={item.code === localAddress['province']} value={item.code} key={item.code}>{item.name}</option>
                                    ))}
                                </select>
                                <select onChange={({target: {name, value}}) => handleChangeDistrict(name, value)} className={classInput} name='district' id="">
                                    {district?.map(item => (
                                        <option selected={item.code === localAddress['district']} value={item.code} key={item.code}>{item.name}</option>
                                    ))}
                                </select>
                                <select onChange={({target: {name, value}})=> {setLocalAddress(prev => ({...prev, [name]: value}))}} className={classInput} name='ward' id="">
                                    {wards?.map(item => (
                                        <option selected={item.code === localAddress['ward']} value={item.code} key={item.code}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="">Detail Address:</label>
                                <input type='text' placeholder='' className={classInput} {...register("detailAddress", { required: 'This input is required' })} />
                                {errors.detailAddress && <span className={classError}>{errors.detailAddress.message}</span>}
                            </div>
                            <div className='mt-5 flex w-fit gap-x-3'>
                                <input disabled={current?.isDefault} onClick={() => setChecked(!checked)} checked={checked} type='checkbox' id='isDefault' {...register("isDefault")} />
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