import axios from "axios";


axios.defaults.withCredentials = true;
const service = axios.create({
    // baseURL: 'http://localhost:9999/api',
    baseURL: process.env.USE_MOCK ? '/mock' : process.env.BASE_API,
    timeout: 5000,
}) 

service.interceptors.request.use(req => {
    return req
}, err => {
    console.log(err)
    return Promise.reject(err);
})

service.interceptors.response.use( res => {
    switch(res.data.code){
       case 1:
        window.location='/login'
        break
       default:
    }
    return res;
}, err => {
    console.log(err)
    return Promise.reject(err);
})

export default service;