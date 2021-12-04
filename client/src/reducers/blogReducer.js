import {SET_COMMENTS, SET_POSTS, SET_POST} from "../constants";

const initialState = {
    currentPosts: [],
    currentPost: {},
    currentComments: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return{
                ...state, currentPosts: action.payload
            }
        case SET_POST:
            return{
                ...state, currentPost: action.payload
            }
        case SET_COMMENTS:
            return {
                ...state, currentComments: action.payload
            }
        default:
            return state
    }
}

export const setPosts = (posts) => ({type: SET_POSTS, payload: posts})
export const setPost = (post) => ({type: SET_POST, payload: post})
export const setComments = (comments) => ({type: SET_COMMENTS, payload: comments})
