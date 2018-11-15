import axios from "axios";


axios.defaults.withCredentials = true;
const service = axios.create({
    baseURL: 'http://localhost:9999/api',
    timeout: 20000,
}) 

service.interceptors.request.use(req => {
    return req
}, err => {
    console.log(err)
    Promise.reject(err);
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
    Promise.reject(err);
})

export default service;