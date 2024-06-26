import axios from "../config/axios"

export const createOrder = (data) => axios({
    url: '/order',
    method: 'post',
    data
})

export const getOrderUser = () => axios({
    url: '/order/user',
    method: 'get'
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