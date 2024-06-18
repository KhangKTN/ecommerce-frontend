import React, { useEffect, useState } from 'react'
import { getCart, updateCart } from '../../apis'
import { getFormatVND } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import CartItem from '../../components/CartItem'

const Cart = () => {
    const [cart, setCart] = useState(null)
    let totalPrice = 0

    const fetchCartData = async() => {
        const res = await getCart()
        if(res.success) setCart(res.data.cart)
        console.log(res);
    }

    const handleChangeQuantity = async({index, value, _id}) => {
        let copyCart = [...cart]
        const prevQuantity = copyCart[index].quantity
        let productQuantity = copyCart[index].product.quantity
        if(copyCart[index].variant){
            const variantList = copyCart[index].product.variant
            productQuantity = variantList.find(item => item._id === copyCart[index].variant).quantity
            console.log(productQuantity);
        }
        if(value === 'remove'){
            copyCart = copyCart?.filter(item => item._id !== _id)
        }
        else if(value === '-') {
            if(prevQuantity !== 1) copyCart[index].quantity = prevQuantity - 1
        }
        else if(value === '+'){
            if(prevQuantity < productQuantity) copyCart[index].quantity = prevQuantity + 1
        }
        else if(+value > 0){
            if(+value > productQuantity) copyCart[index].quantity = productQuantity
            else copyCart[index].quantity = +value
        }
        setCart(copyCart)
        const res = await updateCart(copyCart)
    }

    useEffect(() => {
        fetchCartData()
    }, [])

    return (
        <div className='p-3 h-full min-h-[580px] relative'>
            {cart?.length === 0 ?
            <div className='bg-gradient-to-br from-[#00c6ff] to-[#137af9] rounded-xl w-fit p-10 mx-auto text-white flex gap-y-5 flex-col items-center'>
                <h1><i className="fa-solid fa-cart-shopping text-9xl"></i></h1>
                <h1 className='text-center text-xl font-bold'>There are no products in the cart yet</h1>
            </div>
            :
            <>
            <div className='max-h-[500px] overflow-y-auto overflow-auto'>
                <div className='flex gap-x-3 justify-between text-lg font-bold mb-5'>
                    <div className='min-w-[40%]'>Name product</div>
                    <div className='min-w-[20%]'>Quantity</div>
                    <div className='min-w-[15%]'>Price</div>
                    <div className='min-w-[15%]'>Sum price</div>
                    <div className='min-w-[10%]'>Action</div>
                </div>
                {cart?.map((item, index, arr) => {
                    totalPrice += item.product?.variant.reduce((value, variant) => variant._id === item.variant ? variant.price * item.quantity : value, item.product.price * item.quantity)
                return(
                    <CartItem key={item._id} index={index} cartItem={item} handleChangeQuantity={handleChangeQuantity} />
                )})}
            </div>
            <div className='absolute flex items-center gap-x-5 text-white text-xl font-bold bottom-0 right-0'>
                <div className='text-main'>Total: {getFormatVND(totalPrice)}</div>
                <button className='px-5 py-3 rounded-md bg-main'>Buy now</button>
            </div>
            </>
            }
        </div>
    )
}

export default Cart