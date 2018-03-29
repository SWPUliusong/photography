import axios from "axios"
import { userStore } from "../store"

let options = {
    timeout: 5000,
}

if(process.env.NODE_ENV !== 'production') {
    options.baseURL = "/api"
}

const http = axios.create(options)

http.interceptors.response.use(res => {
    return res.data
}, err => {
    let res = err.response
    console.error(err)
    if (res && res.status === 401) {
        userStore.removeUser()
    }

    return Promise.reject(res)
})

export default http