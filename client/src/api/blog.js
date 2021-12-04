import api from './axios'
import {API_URL} from "../constants";
import {setComments, setPost, setPosts} from "../reducers/blogReducer";

export const getPosts = () => {
    return async dispatch => {
        try{
            const response = await api.get(API_URL + 'blog')
            dispatch(setPosts(response.data))
        }
        catch (e) {
            console.log(e)
        }
    }
}
export const getPersonalPosts = (id) => {
    return async dispatch => {
        try{
            const response = await api.get(API_URL + 'blog/personal/' + id)
            dispatch(setPosts(response.data))
        }
        catch (e) {
            console.log(e)
        }
    }
}
export const getPostById = (id) => {
     return async dispatch => {
         try{
             const response = await api.get(API_URL + 'blog/' + id)
             dispatch(setPost(response.data))
         }
         catch (e) {
             console.log(e)
         }
     }
}
export const createPost = async (title, content, refreshToken) => {
        try{
            const response = await api.post(API_URL + 'blog/my/create', {
                title,
                content,
                refreshToken
            })
            return response.data
        }
        catch (e) {
            console.log(e)
        }
}
export const updatePost = async (title, content, id, refreshToken) => {
        try{
            const response = await api.put(API_URL + 'blog/my/update/' + id, {
                title,
                content,
                refreshToken
            })
            return response.data
        }
        catch (e) {
            console.log(e)
        }
}
export const deletePost = async (id, refreshToken) => {
        try{
            const response = await api.delete(API_URL + 'blog/my/remove/' + id, {
                refreshToken
            })
            return response.data
        }
        catch (e) {
            console.log(e)
        }
}
export const typeComment = (content, id, refreshToken) => {
    return async dispatch => {
        try{
            const response = await api.post(API_URL + 'blog/' + id + '/type-comment', {
                content,
                refreshToken
            })
            dispatch(setComments(response.data))
        }
        catch (e) {
            console.log(e)
        }
    }
}

