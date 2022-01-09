import Axios from "axios";

const success = res => res 
const error = err => {
    if(401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

Axios.interceptors.response.use(success, error)