import React, { useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCart } from '../../apis'
import { getFormatVND } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import CartItem from '../../components/CartItem'
import path from '../../utils/path'
import AddressList from '../../components/modal/AddressList'
import AddAddress from '../../components/modal/AddAddress'

const Checkout = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [cart, setCart] = useState(null)
    const [currentEdit, setCurrentEdit] = useState(null)
    const [modalAddress, setModalAddress] = useState(false)
    const [modalAddAddress, setModalAddAddress] = useState(false)
    const [modelUpdateAddress, setModalUpdateAddress] = useState(false)
    let totalPrice = 0

    const fetchDataCart = async() => {
        const res = await getCart({item: searchParams.get('item')?.trim()})
        if(res.success){
            setCart(res.data.cart)
        }
    }

    useEffect(() => {
        fetchDataCart()
    }, [searchParams])

    return (
        <div className='p-3 h-full min-h-[580px] relative'>
            {cart?.length === 0 ?
                <div className='bg-gradient-to-br from-[#00c6ff] to-[#137af9] rounded-xl w-fit p-10 mx-auto text-white flex gap-y-5 flex-col items-center'>
                    <h1><i className="fa-solid fa-cart-shopping text-9xl"></i></h1>
                    <h1 className='text-center text-xl font-bold'>There are no products in the cart yet</h1>
                </div>
            :
                <>
                    <div className='p-4 rounded-lg bg-gray-100'>
                        <h1 className='text-xl font-semibold text-main'>Address:</h1>
                        <div className='flex gap-x-5'>
                            <h1>Name SDT</h1>
                            <span>Address</span>
                            <button onClick={() => setModalAddress(true)}>Change</button>
                        </div>
                    </div>
                    <div className='overflow-y-auto bg-gray-100 rounded-lg p-4 mt-5'>
                        <div className='flex gap-x-3 justify-between text-lg font-bold mb-5'>
                            <div className='min-w-[50%]'>Name product</div>
                            <div className='min-w-[20%]'>Quantity</div>
                            <div className='min-w-[15%]'>Price</div>
                            <div className='min-w-[15%]'>Sum price</div>
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
                    {modalAddress && <AddressList setCurrentEdit={setCurrentEdit} setModalAddress={setModalAddress} setModalAddAddress={setModalAddAddress} setModalUpdateAddress={setModalUpdateAddress}/>}
                    {modalAddAddress && <AddAddress setModalAddress={setModalAddress} setModalAddAddress={setModalAddAddress}/>}
                    {modelUpdateAddress && <AddAddress current={currentEdit} setModalAddress={setModalAddress} setModalAddAddress={setModalUpdateAddress}/>}
                </>
            }
        </div>
    )
}

export default Checkout