import {SET_USER, IS_AUTH, LOGOUT} from "../constants";

const initialState = {
    currentUser: {},
    isAuth: false,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return{
                ...state, currentUser: action.payload, isAuth: true
            }
        case IS_AUTH:
            return {
                ...state, isAuth: action.payload
            }
        case LOGOUT:
            return{
                ...state, currentUser: {}, isAuth: false
            }
        default:
            return state
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user})
export const isAuth = (auth) => ({type: IS_AUTH, payload: auth})
export const logout = () => ({type: LOGOUT})
