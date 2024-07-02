import React, { useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCart } from '../../apis'
import { getFormatVND } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import CartItem from '../../components/CartItem'
import path from '../../utils/path'
import AddressList from '../../components/modal/AddressList'
import AddAddress from '../../components/modal/AddAddress'
import { useSelector } from 'react-redux'
import { paymentMethod } from '../../utils/contants'
import Paypal from '../../components/payment/Paypal'
import { createOrder, createOrderVnpay } from '../../apis/order'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {getProvinceByCode, getDistrictByCode, getWardByCode} from 'vn-local-plus'

const Checkout = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const {current} = useSelector(state => state.user)

    const [cart, setCart] = useState(null)
    const [address, setAddress] = useState(null)
    const [payment, setPayment] = useState(paymentMethod[0].value)
    const [currentEdit, setCurrentEdit] = useState(null)
    const [isLoadFirst, setIsLoadFirst] = useState(true)
    const [modalAddress, setModalAddress] = useState(false)
    const [modalAddAddress, setModalAddAddress] = useState(false)
    const [modelUpdateAddress, setModalUpdateAddress] = useState(false)

    let totalPrice = 0

    const fetchDataCart = async() => {
        const res = await getCart({item: searchParams.get('item')?.trim()})
        console.log(res);
        if(res.success){
            setCart(res.data.cart)
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0})
        fetchDataCart()
        setAddress(current?.address.find(item => item.isDefault))
    }, [searchParams, current])

    const localAddressToString = (address) => {
        const localAddress = address?.split(',')
        if(!localAddress) return ''
        return `${getProvinceByCode(localAddress[0]).name}, ${getDistrictByCode(localAddress[1]).name}, ${getWardByCode(localAddress[2]).name}`
    }

    const handleCreateOrder = async() => {
        const res = await createOrder({products: cart, totalPrice, address})
        if(res.success){
            Swal.fire({
                title: 'You have placed your order successfully!',
                icon: 'success',
                confirmButtonText: 'View Detail Order',
                showCancelButton: true,
                cancelButtonText: 'Go back home',
                reverseButtons: true
            }).then(result => {
                console.log(result);
                if(result.isConfirmed) navigate(`/order-detail/${res.data._id}`)
                else if(result.isDismissed) navigate(`/${path.HOME}`)
            })
        }
    }

    const handleVnpay = async() => {
        const res = await createOrderVnpay({products: cart, totalPrice, address})
        console.log(res);
        if(res) window.location.href = res?.paymentUrl
    }

    return (
        <div className='h-full min-h-[580px] relative'>
            {cart?.length === 0 ?
                <div className='bg-gradient-to-br from-[#00c6ff] to-[#137af9] rounded-xl w-fit p-10 mx-auto text-white flex gap-y-5 flex-col items-center'>
                    <h1><i className="fa-solid fa-cart-shopping text-9xl"></i></h1>
                    <h1 className='text-center text-xl font-bold'>There are no products in the cart yet</h1>
                </div>
            :
                <>
                    <div className='mt-5 rounded-lg pt-[4px] bg-gradient-to-r from-[#00c6fb] to-[#005bea]'>
                        <div className='py-5 px-8 rounded-b-lg bg-gray-100'>
                            <h1 className='text-xl font-semibold text-main mb-3'><i className="fa-solid fa-location-dot mr-3"></i>Delivery Address</h1>
                            <div className='flex gap-x-5 items-center'>
                                <h1 className={'text-lg font-semibold ' + (!address && 'text-red-400')}>{address ? `${address?.name} | ${address?.phone}` : 'Please add an address for delivery!'}</h1>
                                <span className=''>{localAddressToString(address?.localAddress)}, {address?.detailAddress}</span>
                                <button className='ml-5 text-main hover:underline font-medium' onClick={() => setModalAddress(true)}>{address ? 'Change' : 'Add address'}</button>
                            </div>
                        </div>
                    </div>
                    <div className='overflow-y-auto bg-gray-100 rounded-lg px-8 py-5 mt-5'>
                        <h1 className='text-xl font-semibold text-main mb-3'><i className="fa-solid fa-clipboard-list mr-3"></i>Order Products</h1>
                        <div className='flex gap-x-3 justify-between text-lg font-bold mb-2'>
                            <div className='min-w-[40%]'>Name product</div>
                            <div className='min-w-[20%]'>Quantity</div>
                            <div className='min-w-[15%]'>Price</div>
                            <div className='min-w-[15%]'>Sum price</div>
                            <div className='min-w-[10%]'></div>
                        </div>
                        {cart?.map((item, index, arr) => {
                            totalPrice += item.product?.variant.reduce((value, variant) => variant._id === item.variant ? variant.price * item.quantity : value, item.product.price * item.quantity)
                            return(
                                <CartItem 
                                    key={item._id} 
                                    index={index} 
                                    checked={true} 
                                    cartItem={item} 
                                    handleChangeQuantity={null} 
                                    handleChecked={null}
                                />
                            )}
                        )}
                        <div className='flex mt-3 text-main text-xl font-bold'>
                            <div className='text-right ml-auto'>Total: {getFormatVND(totalPrice)}</div>
                        </div>
                    </div>
                    <div className='mt-5 bg-gray-100 px-8 py-5 rounded-lg'>
                        <h1 className='text-xl font-semibold text-main'><i className="fa-solid fa-file-invoice-dollar mr-3"></i>Payment method</h1>
                        <div className='my-5 flex flex-col gap-y-2'>
                            {paymentMethod.map(item => (
                                <div key={item.id} onClick={() => setPayment(item.value)} className='flex'>
                                    <span className='text-main mr-3 cursor-pointer'><i className={item.value === payment ? 'fa-solid fa-circle-dot ' : 'fa-regular fa-circle'}></i></span>
                                    <img src={item.icon} className='w-12 h-6 object-contain bg-gray-200 mr-3 rounded' alt="" />
                                    <label className='cursor-pointer font-semibold tracking-wide' htmlFor={item.id}>{item.text}</label>
                                </div>
                            ))}
                        </div>
                        <span className='italic text-red-400'>{paymentMethod[paymentMethod.findIndex(item => item.value === payment)].description}</span>
                    </div>
                    <div className='mt-5 w-auto flex justify-center'>
                        {payment === 'paypal' ?
                            <Paypal amount={100} orderData={{products: cart, totalPrice, address}}/>
                        :
                            <button onClick={() => {payment === 'cod' ? handleCreateOrder() : handleVnpay()}} className='px-4 py-3 bg-main text-white rounded-md text-lg'>Order Now</button>
                        }
                    </div>
                    {modalAddress && <AddressList address={address} setAddress={setAddress} isLoadFirst={isLoadFirst} setCurrentEdit={setCurrentEdit} setModalAddress={setModalAddress} setModalAddAddress={setModalAddAddress} setModalUpdateAddress={setModalUpdateAddress}/>}
                    {modalAddAddress && <AddAddress setIsLoadFirst={setIsLoadFirst} setModalAddress={setModalAddress} setModalAddAddress={setModalAddAddress}/>}
                    {modelUpdateAddress && <AddAddress setIsLoadFirst={setIsLoadFirst} current={currentEdit} setModalAddress={setModalAddress} setModalAddAddress={setModalUpdateAddress}/>}
                </>
            }
        </div>
    )
}

export default Checkout