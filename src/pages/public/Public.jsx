import { Outlet } from 'react-router-dom'
import { Footer, Header, Nav, TopHeader } from '../../components/layout'

const Public = () => {
    return (
        <>
            <TopHeader />
            <div className='w-main px-5 mx-auto'>
                <div className=''>
                    <Header />
                </div>
                <div className=''>
                    <Nav />
                </div>
                <Outlet />
            </div>
            <div className='mt-10'>
                <Footer />
            </div>
        </>
    )
}

export default Public
