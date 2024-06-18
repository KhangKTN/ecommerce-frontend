import React, { memo } from 'react'

const Footer = () => {
    return (
        <div className='text-white'>
            <div className='bg-[#5bbcff] h-[120px] rounded-t-3xl px-40 flex justify-between items-center text-white'>
                <div>
                    <h1 className='uppercase text-2xl'>Sign up to newsletter</h1>
                    <h1 className='text-sm'>Subscribe now and receive weekly newsletter</h1>
                </div>
                <div className='rounded-3xl bg-[#8fccf8] w-1/2 py-3 px-6 flex'>
                    <input className='w-full bg-transparent placeholder:text-white focus:outline-none' type="text" placeholder='Enter email...'/>
                    <span className='size-4 text-white'><i className="fa-solid fa-envelope"></i></span>
                </div>
            </div>
            <div className='bg-[#433f3f] h-[300px] px-40'>
                <div className='py-10 flex gap-x-10 justify-between'>
                    <div>
                        <span className='border-l-[3px] border-[#5bbcff] uppercase pl-2 font-bold'>About us</span>
                        <h1 className='text-gray-300 font-light mt-5'><span className='font-semibold text-white'><i className="fa-solid fa-location-dot mr-2 min-w-4f"></i>Address: </span>474 Ontario St Toronto, ON M4X 1M7 Canada</h1>
                        <h1 className='text-gray-300 font-light mt-2'><span className='font-semibold text-white'><i className="fa-solid fa-phone mr-2 min-w-4f"></i>Phone: </span>(+1234)56789xxx</h1>
                        <h1 className='text-gray-300 font-light mt-2'><span className='font-semibold text-white'><i className="fa-regular fa-envelope-open mr-2 min-w-4f"></i>Mail: </span>tadathemes@gmail.com</h1>
                        <div className='flex gap-x-3 mt-3'>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-facebook-f"></i></div>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-twitter"></i></div>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-pinterest"></i></div>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-google-plus-g"></i></div>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-instagram"></i></div>
                            <div className='flex items-center justify-center size-10 rounded-sm bg-slate-600'><i className="fa-brands fa-tiktok"></i></div>
                            
                        </div>
                    </div>
                    <div>
                        <span className='border-l-[3px] border-[#5bbcff] uppercase pl-2 font-bold'>information</span>
                        <div className='flex flex-col text-gray-400 font-light text-sm mt-5 gap-y-2'>
                            <h1>Typography</h1>
                            <h1>Gallery</h1>
                            <h1>Store Location</h1>
                            <h1>Today's Deals</h1>
                            <h1>Contact</h1>
                        </div>
                    </div>
                    <div>
                        <span className='border-l-[3px] border-[#5bbcff] uppercase pl-2 font-bold'>Who we are</span>
                        <div className='flex flex-col text-gray-400 font-light text-sm mt-5 gap-y-2'>
                            <h1>Help</h1>
                            <h1>Free Shipping</h1>
                            <h1>FAQs</h1>
                            <h1>Return & Exchange</h1>
                            <h1>Gallery</h1>
                        </div>
                    </div>
                    <div>
                        <span className='border-l-[3px] border-[#5bbcff] uppercase pl-2 font-bold'>#DIGITALWORLDSTORE</span>
                    </div>

                </div>
            </div>
            <div className='bg-black py-5 px-40 flex justify-between'>
                <h1>© 2024, Digital World 2 Powered by Shopify</h1>
                <div className='text-4xl flex gap-x-3'>
                    <i className="fa-brands fa-cc-visa"></i>
                    <i className="fa-brands fa-cc-mastercard"></i>
                    <i className="fa-brands fa-cc-paypal"></i>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)