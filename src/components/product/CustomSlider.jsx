import React, { memo } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { Product } from '.'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    swipeToSlide: true
}

const CustomSlider = ({ productList, showInfo, logo }) => {
    return (
        <Slider {...settings}>
            {productList?.map((item) => (
                <Product key={item._id} product={item} showInfo={showInfo} logo={logo} />
            ))}
        </Slider>
    )
}

export default memo(CustomSlider)
