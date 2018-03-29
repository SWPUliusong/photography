import axios from "axios"
import { userStore } from "../store"

let http = axios.create({
    timeout: 2000,
    baseURL: "/api"
})

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