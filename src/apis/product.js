import axios from "../config/axios"

export const getProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})

export const getBrandList = () => axios({
    url: '/product/brandList',
    method: 'get',
})

export const getProductDetail = (productId) => axios({
    url: `/product/${productId}`,
    method: 'get'
})

export const getRating = (productId, query) => axios({
    url: `/product/rating/${productId}?filter=${query}`,
    method: 'get'
})

export const postRating = (data) => axios({
    url: `/vote/`,
    method: 'post',
    data
})

export const getVoting = (params) => axios({
    url: '/vote/',
    method: 'get',
    params
})

export const getInfoVoteSummary = (params) => axios({
    url: '/vote/infoSummary',
    method: 'get',
    params
})

export const createProduct = (data) => axios({
    url: '/product',
    method: 'post',
    data
})

export const deleteProduct = (data) => axios({
    url: '/product/deleteProduct',
    method: 'delete',
    data
})

export const updateProduct = (data) => {
    return axios({
        url: '/product/update',
        method: 'put',
        data
    })
}

export const addVariant = (data) => {
    return axios({
        url: '/product/addVariant',
        method: 'put',
        data
    })
}

export const deleteVariant = (data) => {
    return axios({
        url: '/product/deleteVariant',
        method: 'delete',
        data
    })
}
