import axios from "../config/axios"

export const registerApi = (data) => axios({
    url: '/user/register',
    method: 'post',
    data
})

export const loginApi = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const forgotPassword = (data) => axios({
    url: `/user/forgotPassword`,
    method: 'post',
    data,
    params: {test: 'test'}
})

export const resetPassword = (data) => axios({
    url: '/user/resetPassword',
    method: 'post',
    data
})

export const getCurrentUser = () => axios({
    url: '/user/currentUser',
    method: 'get'
})

export const getUserList = (params) => axios({
    url: '/user/getAllUser',
    method: 'get',
    params
})

export const updateUser = (data) => axios({
    url: 'user/updateUser',
    method: 'put',
    data
})

export const changePassword = (data) => axios({
    url: 'user/changePassword',
    method: 'put',
    data
})

export const updateUserByAdmin = (data) => axios({
    url: 'user/updateUserAdmin',
    method: 'put',
    data
})

export const getCart = (data) => axios({
    url: 'user/cart',
    method: 'get'
})

export const addCart = (data) => axios({
    url: 'user/addCart',
    method: 'put',
    data
})

export const updateCart = (data) => axios({
    url: 'user/updateCart',
    method: 'put',
    data
})

export const addWishList = (productId) => axios({
    url: `user/wishList/${productId}`,
    method: 'put'
})