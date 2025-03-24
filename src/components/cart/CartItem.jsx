import Tippy from '@tippyjs/react'
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFormatVND } from '../../utils/helpers'

const CartItem = ({
    index,
    cartItem,
    handleChangeQuantity,
    checked,
    handleChecked,
    isEdit,
    isShowRating,
    setProductComment
}) => {
    const [qtyAvailable, setQtyAvailable] = useState(cartItem.product.quantity)

    const getPrice = () => {
        if (cartItem.variant) {
            const variantId = cartItem.variant
            const productVariant = cartItem?.product?.variant?.find((variant) => variant._id === variantId)
            return getFormatVND(productVariant?.price)
        }
        return getFormatVND(cartItem.product.price)
    }

    const getSumPrice = () => {
        if (cartItem.variant) {
            const variantId = cartItem.variant
            const productVariant = cartItem?.product?.variant?.find((variant) => variant._id === variantId)
            return getFormatVND(productVariant?.price * cartItem.quantity)
        }
        return getFormatVND(cartItem.product.price * cartItem.quantity)
    }

    useEffect(() => {
        const variantList = cartItem.product.variant
        if (variantList?.length > 1 && cartItem.variant) {
            const quantity = variantList?.find((item) => item._id === cartItem.variant).quantity
            setQtyAvailable(quantity)
        }
    }, [])

    return (
        <div className='flex items-center gap-x-3 border-b-[1px] py-2'>
            <div className={`flex items-center min-w-[40%]`}>
                {isEdit && (
                    <span onClick={() => handleChecked(cartItem._id)} className='text-main cursor-pointer text-lg'>
                        <i className={`${checked ? 'fa-solid fa-square-check' : 'fa-regular fa-square'}`}></i>
                    </span>
                )}
                <Link
                    className='flex items-center gap-x-3'
                    to={`/${cartItem?.product?.category?.toLowerCase()}/${cartItem.product._id}/${
                        cartItem.product.slug
                    }`}
                >
                    <img className='w-10 h-[60px] object-contain' src={cartItem.product.thumbnail} alt='' />
                    <div className='flex flex-col'>
                        <span className='hover:text-main font-semibold'>{cartItem.product.name}</span>
                        {cartItem?.variant && (
                            <span className='text-gray-500 italic font-medium'>
                                {cartItem?.product?.variant?.reduce(
                                    (value, variant) =>
                                        variant._id === cartItem.variant
                                            ? `${variant.variantType}: ${variant.name}`
                                            : value,
                                    ''
                                )}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
            <div className='min-w-[20%]'>
                {isEdit ? (
                    <div className='flex mb-3'>
                        <button
                            onClick={() => handleChangeQuantity({ index, value: '-', _id: cartItem._id })}
                            className='h-10 px-3 bg-main font-bold text-lg rounded-s-md hover:text-white'
                        >
                            <i className='fa-solid fa-minus'></i>
                        </button>
                        <input
                            onChange={(e) => handleChangeQuantity({ index, value: e.target.value, _id: cartItem._id })}
                            value={cartItem?.quantity}
                            className='w-[40px] h-10 box-border border-[rgb(91,188,255)] border-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            type='number'
                        />
                        <button
                            onClick={() => handleChangeQuantity({ index, value: '+', _id: cartItem._id })}
                            className='h-10 px-3 bg-main font-bold text-lg rounded-e-md hover:text-white'
                        >
                            <i className='fa-solid fa-plus'></i>
                        </button>
                    </div>
                ) : (
                    <div>
                        <span>x {cartItem?.quantity}</span>
                    </div>
                )}
                {/* <span className='text-gray-500 italic'>{qtyAvailable} is available</span> */}
            </div>
            <div className='min-w-[15%] font-semibold'>{getPrice()}</div>
            <div className='min-w-[15%] font-semibold text-lg text-main'>{getSumPrice()}</div>
            {isEdit && (
                <div className='min-w-[10%]'>
                    <Tippy className='text-red-500 bg-gray-700' content={<span>Delete</span>}>
                        <button
                            onClick={() => handleChangeQuantity({ index, value: 'remove', _id: cartItem._id })}
                            className={
                                'px-5 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                            }
                        >
                            <i className='fa-regular fa-trash-can'></i>
                        </button>
                    </Tippy>
                </div>
            )}
            {isShowRating && (
                <div className='min-w-[10%]'>
                    <Tippy className='text-white bg-gray-700' content={<span>Rating now</span>}>
                        <button
                            onClick={() => {
                                setProductComment({
                                    productId: cartItem?.product?._id,
                                    variantId: cartItem?.variant,
                                    variant: cartItem?.product?.variant?.reduce(
                                        (value, variant) =>
                                            variant._id === cartItem.variant
                                                ? `${variant.variantType}: ${variant.name}`
                                                : value,
                                        ''
                                    )
                                })
                            }}
                            className={
                                'px-5 py-2 rounded-lg border-2 border-main text-main hover:bg-main hover:text-white'
                            }
                        >
                            <i className='fa-solid fa-star'></i>
                        </button>
                    </Tippy>
                </div>
            )}
        </div>
    )
}

export default memo(CartItem)
