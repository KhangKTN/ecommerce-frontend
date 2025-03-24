import React from 'react'

const Banner = () => {
    return (
        <section className={`w-full h-[470px] rounded-md overflow-hidden`}>
            <iframe
                className='w-full h-full'
                src='https://www.youtube.com/embed/0JcbvKLMfts'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
            ></iframe>
        </section>
    )
}

export default Banner
