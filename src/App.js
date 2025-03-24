import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCategoryList } from './app/actions/appAction'
import { BlogList } from './components/blog'
import { Account, Cart, ChangePassword, Checkout, Order, OrderDetail, PaidFinish, PersonalInfo } from './pages/member'
import { AdminHome, CreateBlog, CreateProduct, Dashboard, ManageBill, ManageBlog, ManageProduct, ManageUser } from './pages/private'
import {
    Blog,
    Category,
    CompleteRegister,
    DetailBlog,
    DetailProduct,
    Faq,
    ForgotPassword,
    Home,
    Login,
    LoginSuccess,
    Products,
    Public,
    Register,
    Services
} from './pages/public'
import { linkBlog } from './utils/contants'
import path from './utils/path'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoryList())
    }, [dispatch])

    return (
        <div className='min-h-screen font-main'>
            <Routes>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.LOGIN_SUCCESS} element={<LoginSuccess />} />
                <Route path={path.REGISTER} element={<Register />} />
                <Route path={path.COMPLETE_REGISTER} element={<CompleteRegister />} />
                <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.CATEGORY} element={<Category />} />
                    <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
                    <Route path={path.OUR_SERVICES} element={<Services />} />
                    <Route path={path.BLOGS} element={<Blog />}>
                        {linkBlog.map((item) => (
                            <Route key={item.id} path={`${item.value}`} element={<BlogList />} />
                        ))}
                    </Route>
                    <Route path={path.DETAIL_BLOG} element={<DetailBlog />} />
                    <Route path={path.FAQ} element={<Faq />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                    <Route path={path.CHECKOUT} element={<Checkout />} />
                    <Route path={path.ORDER_DETAIL} element={<OrderDetail />} />
                    <Route path={path.PAID_FINISH} element={<PaidFinish />} />
                    <Route path={path.ACCOUNT} element={<Account />}>
                        <Route path={path.PROFILE} element={<PersonalInfo />} />
                        <Route path={path.CART} element={<Cart />} />
                        <Route path={path.ORDER} element={<Order />} />
                        <Route path={path.SECURITY} element={<ChangePassword />} />
                    </Route>
                </Route>
                <Route path={path.ADMIN} element={<AdminHome />}>
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                    <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
                    <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
                    <Route path={path.MANAGE_ORDER} element={<ManageBill />} />
                    <Route path={path.DASHBOARD} element={<Dashboard />} />
                    <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
                    <Route path={path.MANAGE_BLOG} element={<ManageBlog />} />
                </Route>
            </Routes>

            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                limit={3}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
                transition={Slide}
            />
        </div>
    )
}

export default App
