import api from './axios'
import {API_URL} from "../constants";
import {isAuth, setUser} from "../reducers/userReducer"

export const registration = (email, password, name) => {
    return async dispatch => {
        try {
            const response = await api.post(API_URL + 'user/registration', {
                email,
                password,
                name
            })
            setData(response, dispatch)
        } catch (e) {
            console.log(e)
        }
    }
}
export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await api.post(API_URL + 'user/login',{
                email,
                password
            })
            setData(response, dispatch)
        }
        catch (e) {
            console.log(e)
        }
    }
}
export const setData = (response, dispatch) => {
   try {
       dispatch(setUser(response.data.userDto))
       dispatch(isAuth(true))
       localStorage.setItem('accessToken', response.data.accessToken)
       localStorage.setItem('userId', response.data.userDto.id)
   }
   catch (e) {
       console.log(e)
   }
}
export const getUsers = async () => {
    const response = await api.get(API_URL + 'user/users')
    return response.data
}
export const getUserById = async (id) => {
    const response = await api.get(API_URL + 'user/' + id)
    return response.data
}
export const refresh = () => {
    return async dispatch => {
        try {
            const response = await api.get(API_URL + 'user/refresh', {withCredentials: true})
            setData(response, dispatch)
        } catch (e) {
            console.log(e);
        }
    }
}

