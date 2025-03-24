import Tippy from '@tippyjs/react'
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'tippy.js/dist/tippy.css'
import { addCart, addWishList } from '../../apis/user'
import { getCurrentUser } from '../../app/actions/userAction'
import { getFormatVND } from '../../utils/helpers'
import ActionButton from '../ui/ActionButton'
import Rating from './Rating'

const Product = ({ product, showInfo, logo }) => {
    const [isHover, setIsHover] = useState(false)
    const dispatcher = useDispatch()
    const { current } = useSelector((state) => state.user)

    const handleAddCart = async (e) => {
        e.stopPropagation()
        const res = await addCart({ product: product?._id, quantity: 1, variant: null })
        if (res.success) {
            toast.success(res.message)
            dispatcher(getCurrentUser())
        } else toast.error(res.message)
    }

    const isFavourite = () => current?.wishlist.some((item) => item === product._id)

    return (
        <Link
            to={`/${product?.category?.toLowerCase()}/${product?._id}/${product?.slug}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className='px-[10px] block mt-8'
        >
            <div className='border-[1px] border-gray-300 h-[385px] rounded-lg relative transition-all duration-[500]'>
                {logo && <img className='absolute -top-8 right-0 z-10 rotate-12 w-20 h-20' src={logo} alt='' />}
                <div className='h-[243px] relative hover:cursor-pointer'>
                    <img className='h-full w-full object-contain' src={product?.thumbnail} alt='' />
                    {
                        <div
                            className={
                                'absolute z-10 top-0 right-0 left-0 flex gap-x-3 ' +
                                (isHover ? 'animate-slide-in-bottom' : 'animate-slide-to-bottom') +
                                (showInfo
                                    ? ' bg-[#ffffff8c] opacity-50 backdrop-blur-md flex-col bottom-0 justify-between'
                                    : ' items-end -bottom-[10px] justify-end')
                            }
                        >
                            {showInfo && (
                                <>
                                    <div className='border-b-[1px] py-2'>
                                        <h1 className='text-lg font-semibold ml-3'>{product?.name}</h1>
                                    </div>
                                    <div className='mt-3 ml-3'>
                                        {product?.description.map(
                                            (item, index) =>
                                                index < 10 && (
                                                    <h1 key={index} className='text-sm'>
                                                        {item}
                                                    </h1>
                                                )
                                        )}
                                    </div>
                                </>
                            )}
                            <div className='flex gap-x-3 mx-auto mt-5'>
                                {/* <Tippy className='text-main' content={<span></span>}> */}
                                <Link
                                    onClick={async (e) => {
                                        await addWishList(product._id)
                                        e.stopPropagation()
                                        dispatcher(getCurrentUser())
                                    }}
                                >
                                    <ActionButton
                                        color={isFavourite() ? 'bg-pink-500 text-white' : null}
                                        icon={<i className='fa-regular fa-heart'></i>}
                                    />
                                </Link>
                                {/* </div></Tippy> */}
                                <Tippy className='text-main' content={<span>Add to cart</span>}>
                                    <Link onClick={(e) => handleAddCart(e)}>
                                        <ActionButton icon={<i className='fa-solid fa-cart-plus'></i>} />
                                    </Link>
                                </Tippy>
                                <ActionButton icon={<i className='fa-regular fa-eye'></i>} />
                            </div>
                        </div>
                    }
                </div>
                <div className='flex flex-col px-4 mt-4 gap-y-2 relative'>
                    <div
                        className={
                            showInfo && isHover
                                ? 'absolute top-0 right-0 bottom-0 left-0 bg-[#ffffffd4] opacity-90 backdrop-blur-md'
                                : ''
                        }
                    ></div>
                    <h1 className='font-bold truncate hover:text-main hover:cursor-pointer'>{product.name}</h1>
                    <Rating rating={product?.totalRating} />
                    <h1 className='text-main text-xl'>{getFormatVND(product?.price)}</h1>
                </div>
            </div>
        </Link>
    )
}

export default memo(Product)
