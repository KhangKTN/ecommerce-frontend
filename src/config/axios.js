import axios from "axios";
// require('dotenv').config()

const instance = axios.create({
    baseURL: process.env.REACT_APP_URI
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function(config){
    // Làm gì đó trước khi request được gửi đi
    // Allow save cookies on browser
    config.withCredentials = true
    const userData = JSON.parse(window.localStorage.getItem('persist:shop/user'))
    const token = JSON.parse(userData.token)
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error){
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function(response){
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
}, function (error){
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data
});

export default instance