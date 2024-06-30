import axios from "../config/axios"

export const createOrder = (data) => axios({
    url: '/order',
    method: 'post',
    data
})

export const createOrderVnpay = (data) => axios({
    url: '/order/vnpay',
    method: 'post',
    data
})

export const verifyVnpay = (params) => axios({
    url: '/order/verifyVnpay',
    method: 'get',
    params
})

export const getOrderUser = (params) => axios({
    url: '/order/user',
    method: 'get',
    params
})

export const getOrderListAdmin = (params) => axios({
    url: '/order',
    method: 'get',
    params
})

export const getOrderDetail = (id) => axios({
    url: '/order/' + id,
    method: 'get'
})

export const updateStatusOrder = (orderId, data) => axios({
    url: '/order/' + orderId,
    method: 'put',
    data
})