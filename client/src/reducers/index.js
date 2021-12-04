import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './blogReducer'
import userReducer from './userReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))