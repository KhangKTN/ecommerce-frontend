import axios from "../config/axios";

export const getCategories = () => axios({
    url: '/category',
    method: 'GET'
})