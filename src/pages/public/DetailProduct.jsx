import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { addCart } from '../../apis'
import { getProductDetail, getProducts } from '../../apis/product'
import { getCurrentUser } from '../../app/actions/userAction'
import { Comment, ModalImage, Rating } from '../../components/product'
import CustomSlider from '../../components/product/CustomSlider'
import SkeletonDetailProduct from '../../components/skeleton/SkeletonDetailProduct'
import { Breakcrumb } from '../../components/ui'
import { getFormatVND, getRangePrice } from '../../utils/helpers'

let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: true,
    arrows: true
}

const DetailProduct = () => {
    const dispatcher = useDispatch()
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [favouriteProd, setFavouriteProd] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [qtyAvailable, setQtyAvailable] = useState(0)
    const [isShow, setIsShow] = useState(false)
    const [variantSelected, setVariantSelected] = useState(null)
    const [isHover, setIsHover] = useState(false)

    const [thumbnail, setThumbnail] = useState(null)
    const [price, setPrice] = useState(0)

    const fetchProductDetail = async () => {
        const res = await getProductDetail(id)
        setTimeout(() => {
            if (res?.success) {
                setProduct(res.data)
                setQtyAvailable(res.data.quantity)
                setThumbnail(res.data.thumbnail)
                settings.arrows = res?.data?.image.length > 3 ? true : false
                if (res.data.variant.length > 0) {
                    if (res.data.variant.length === 1) {
                        setPrice(getFormatVND(res.data?.variant[0].price))
                        setVariantSelected(res.data.variant[0]._id)
                    } else {
                        setPrice(getRangePrice(res.data.variant))
                    }
                    return
                }
                setPrice(getFormatVND(res.data?.price))
            }
        }, 500)
    }

    const fetchFavProduct = async () => {
        const category = product?.category
        const _id = { $ne: product._id }
        const res = await getProducts({ category, _id })
        if (res?.success) {
            setFavouriteProd(res.data)
        }
    }

    useEffect(() => {
        product && setProduct(null)
        if (id) fetchProductDetail(id)
        window.scrollTo({
            top: 200,
            behavior: 'auto'
        })
    }, [id])

    useEffect(() => {
        if (product) fetchFavProduct()
    }, [product])

    const handleAddCart = async () => {
        if (product?.variant.length > 0 && variantSelected === null) {
            toast.error('Please choose 1 option')
            return
        }
        await addCart({ product: product?._id, quantity, variant: variantSelected })
        toast.success('Add to cart succeed!')
        dispatcher(getCurrentUser())
    }

    const handleSelectVariant = (variant) => {
        setVariantSelected(variant._id)
        setPrice(getFormatVND(variant.price))
        setQtyAvailable(variant.quantity)
        setQuantity(1)
    }

    const handleChangeQuantity = (value) => {
        if (value === '-') {
            if (quantity !== 1) setQuantity(quantity - 1)
        } else if (value === '+') {
            if (quantity < qtyAvailable) setQuantity(quantity + 1)
        } else if (+value > 0) {
            if (+value > qtyAvailable) setQuantity(qtyAvailable)
            else setQuantity(value)
        }
    }

    if (!product) {
        return <SkeletonDetailProduct />
    }

    return (
        <div className='mt-5'>
            <div>
                {/* Show break crumb */}
                <Breakcrumb category={product?.category} name={product?.name} />
                <h1 className='my-4 text-2xl font-bold'>{product?.name}</h1>
                {/* Product detail information */}
                <div className='flex gap-x-10'>
                    {/* Thumbnail and all image of product */}
                    <div className='w-[460px]'>
                        <img className='w-[460px] h-[460px] border object-contain' src={thumbnail} alt='' />
                        <div className='w-full h-[200px] mt-5'>
                            {product?.image?.length > 3 ? (
                                <Slider {...settings}>
                                    {product?.image.map((item, index) => (
                                        <div key={item} className='px-2'>
                                            <img
                                                onMouseEnter={() => setThumbnail(item)}
                                                onClick={() => setIsShow(true)}
                                                key={index}
                                                className={`w-full h-[150px] object-contain cursor-pointer ${
                                                    thumbnail === item && 'border-main border-2'
                                                }`}
                                                src={item}
                                                alt='more-img-product'
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className='grid grid-cols-3'>
                                    {product?.image.map((item, index) => (
                                        <div key={item} className='gap-x-3'>
                                            <img
                                                onMouseEnter={() => setThumbnail(item)}
                                                onClick={() => setIsShow(true)}
                                                key={index}
                                                className={`w-full h-[150px] object-contain cursor-pointer ${
                                                    thumbnail === item && 'border-main border-2'
                                                }`}
                                                src={item}
                                                alt='more-img-product'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* All information about product */}
                    <div className='flex flex-col gap-y-5'>
                        <h1 className='text-4xl text-main font-bold mb-5'>{price}</h1>
                        <div className='flex -mt-3'>
                            <Rating rating={product?.totalRating} />
                            <div className='bg-gray-500 mx-3 w-[1px]'></div>
                            <h1 className=''>
                                <span className='font-bold'>{product?.sold}</span> Sold
                            </h1>
                        </div>
                        <ul className=''>
                            {product?.description.map((item, index) => (
                                <li className='list-disc list-inside' key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        {/* <h1>Internal</h1> */}
                        <div className='flex gap-x-5 items-center'>
                            <h1>Color:</h1>
                            <div className='grid grid-cols-5 gap-x-3'>
                                {product?.variant.map((item) => (
                                    <button
                                        onMouseEnter={() => setThumbnail(item.thumbnail)}
                                        onClick={() => handleSelectVariant(item)}
                                        className={`flex items-center justify-center cursor-pointer gap-x-3 p-2 border-[1px] ${
                                            variantSelected === item._id ? 'border-main' : 'border-gray-300'
                                        }`}
                                        key={item._id}
                                    >
                                        <img className='h-10 w-8 object-contain' src={item.thumbnail} alt='' />
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-x-10 items-center'>
                            <h1>Quantity</h1>
                            <div className='flex items-center'>
                                <button
                                    onClick={(e) => handleChangeQuantity('-')}
                                    className='h-10 px-3 bg-main font-bold text-lg rounded-s-md hover:text-white'
                                >
                                    <i className='fa-solid fa-minus'></i>
                                </button>
                                <input
                                    onChange={(e) => handleChangeQuantity(e.target.value)}
                                    value={quantity}
                                    className='w-[60px] h-10 box-border border-[rgb(91,188,255)] border-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                    type='number'
                                />
                                <button
                                    onClick={(e) => handleChangeQuantity('+')}
                                    className='h-10 px-3 bg-main font-bold text-lg rounded-e-md hover:text-white'
                                >
                                    <i className='fa-solid fa-plus'></i>
                                </button>
                            </div>
                            <h1>{qtyAvailable} product is available</h1>
                        </div>
                        <div className='flex gap-x-3'>
                            <button
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                onClick={() => handleAddCart()}
                                className='p-3 w-full max-w-[250px] text-white capitalize font-bold bg-main rounded-md mt-3 hover:text-main text-lg border-2 border-[#5bbcff] hover:bg-white transition-all duration-500'
                            >
                                <i
                                    className={`fa-solid fa-cart-plus mr-3 ${isHover && 'animate-shake-horizontal'}`}
                                ></i>
                                Add to cart
                            </button>
                            <button className='p-3 w-full max-w-[250px] text-white capitalize font-bold bg-main rounded-md mt-3 hover:text-main text-lg border-2 border-[#5bbcff] hover:bg-white transition-all duration-500'>
                                <i className='fa-solid fa-money-bill-wave mr-3'></i>Buy now
                            </button>
                        </div>
                    </div>
                </div>
                {isShow && <ModalImage setIsShow={setIsShow} listImage={[...product?.image]} name={product?.name} />}
                {/* Component comment / rating product */}
                <Comment productId={product?._id} />
                {/* Show list suggest products */}
                <div className='mt-10'>
                    <h1 className='py-3 border-b-[3px] border-[#5bbcff] text-2xl font-bold capitalize tracking-wider'>
                        Maybe you like
                    </h1>
                    <CustomSlider productList={favouriteProd} />
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
