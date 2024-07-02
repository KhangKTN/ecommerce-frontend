import axios from "../config/axios"

export const getReply = (params) => axios({
    url: '/vote/reply',
    method: 'get',
    params
})

export const postReply = (data) => axios({
    url: '/vote/reply',
    method: 'post',
    data
})