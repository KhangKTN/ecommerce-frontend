import axios from "../config/axios"

export const getBlogList = (params) => axios({
    url: '/blog',
    method: 'get',
    params
})

export const getBlogDetail = (blogId) => axios({
    url: '/blog/' + blogId,
    method: 'get',
})

export const createBlog = (data) => axios({
    url: '/blog',
    method: 'post',
    data
})

export const updateBlog = (data) => axios({
    url: '/blog',
    method: 'put',
    data
})