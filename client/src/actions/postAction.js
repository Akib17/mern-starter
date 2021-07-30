import axios from "axios";
import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKE } from "./types";

// Get all posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
         
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
     }
}
 
// Get single post
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/post/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
};

// Delete Single Post
export const deletePost = id => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/post/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
};

// Create post
export const createPost = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/post', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
};

// Like post
export const likePost = id => async (dispatch) => {
    try {
        const res = await axios.put(`/api/post/like/${id}`)
        dispatch({
            type: UPDATE_LIKE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
};

// Post comment
export const postComment = (postId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/post/${postId}`)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(`/api/post/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
}