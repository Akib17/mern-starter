import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, GET_POST, GET_POSTS, UPDATE_LIKE, UPDATE_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {},
    loading: true,
    error: {}
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
        case UPDATE_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            };
        case UPDATE_LIKE:
            return {
                ...state,
                posts: state.posts.find(post => post._id === action.payload.id ? post.likes = action.payload.likes : post),
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: action.payload },
                loading: false
            };
        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== action.payload)
                }
            };
        default:
            return state;
    }
};

export default postReducer;