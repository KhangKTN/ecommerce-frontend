import React, { memo } from 'react'
import { getFormatVND } from '../utils/helpers'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const FeaturedItem = ({product}) => {
    return (
        <Link to={`/${product?.category.toLowerCase()}/${product?._id}/${product?.slug}`}>
            <div className='h-[150px] border shadow-sm hover:shadow-lg hover:cursor-pointer rounded-md p-4 flex gap-x-5 items-center'>
                <img className='size-[85px]' src={product?.thumbnail} alt="featureImg" />
                <div className='w-3/4 flex flex-col gap-y-2'>
                        <span className='text-lg font-semibold w-fit hover:text-main hover:cursor-pointer'>{product?.name}</span>
                    <Rating rating={product?.totalRating} />
                    <span className='font-semibold text-main text-lg'>{getFormatVND(product?.price)}</span>
                </div>
            </div>
        </Link>
    )
}

export default memo(FeaturedItem)