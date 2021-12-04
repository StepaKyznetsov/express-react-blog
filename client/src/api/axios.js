import axios from 'axios'
import {API_URL} from "../constants";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
    },
    (async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try{
                const response = await axios.get(API_URL + 'refresh',{
                    withCredentials: true
                })
                localStorage.setItem('accessToken', response.data.accessToken)
                return api.request(originalRequest)
            }
            catch (e) {
                console.log('no auth')
            }
        }
        throw error
}))

export default api