import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login, Home, DetailProduct, Services, Blog, Products, Register, CompleteRegister, ForgotPassword, Category} from './pages/public'
import path from './utils/path'
import Public from './pages/public/Public';
import {getCategoryList} from './app/asyncAction'
import { useDispatch } from 'react-redux';
import Faq from './pages/public/Faq';
import { ToastContainer, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {AdminHome, CreateProduct, Dashboard, ManageBill, ManageProduct, ManageUser} from './pages/private';
import PersonalInfo from './pages/member/PersonalInfo';
import Account from './pages/member/Account';
import Cart from './pages/member/Cart';
import ChangePassword from './pages/member/ChangePassword';
import CreateBlog from './pages/private/CreateBlog';
import DetailBlog from './pages/public/DetailBlog';
import { linkBlog } from './utils/contants';
import BlogList from './components/BlogList';
import ManageBlog from './pages/private/ManageBlog';
import Checkout from './pages/member/Checkout';
import Order from './pages/member/Order';
import OrderDetail from './pages/member/OrderDetail';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryList())
  }, [])

  return (
    <div className="min-h-screen font-main">
      <Routes>
          <Route path={path.LOGIN} element={<Login/>}/>
          <Route path={path.REGISTER} element={<Register/>}/>
          <Route path={path.COMPLETE_REGISTER} element={<CompleteRegister/>}/>
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.CATEGORY} element={<Category/>}/>
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct/>}/>
          <Route path={path.OUR_SERVICES} element={<Services/>}/>
          <Route path={path.BLOGS} element={<Blog/>}>
            {linkBlog.map(item => (
              <Route path={`${item.value}`} element={<BlogList/>}/>
            ))}
          </Route>
          <Route path={path.DETAIL_BLOG} element={<DetailBlog/>}/>
          <Route path={path.FAQ} element={<Faq/>}/>
          <Route path={path.PRODUCTS} element={<Products/>}/>
          <Route path={path.CHECKOUT} element={<Checkout/>}/>
          <Route path={path.ORDER_DETAIL} element={<OrderDetail/>}/>
          <Route path={path.ACCOUNT} element={<Account/>}>
            <Route path={path.PROFILE} element={<PersonalInfo/>}/>
            <Route path={path.CART} element={<Cart/>}/>
            <Route path={path.ORDER} element={<Order/>}/>
            <Route path={path.SECURITY} element={<ChangePassword/>}/>
          </Route>
        </Route>
        <Route path={path.ADMIN} element={<AdminHome/>}>
          <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct/>}/>
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct/>}/>
          <Route path={path.MANAGE_ORDER} element={<ManageBill/>}/>
          <Route path={path.DASHBOARD} element={<Dashboard/>}/>
          <Route path={path.CREATE_BLOG} element={<CreateBlog/>}/>
          <Route path={path.MANAGE_BLOG} element={<ManageBlog/>}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        limit={3}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}

export default App;
