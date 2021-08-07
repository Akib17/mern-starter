import { ACCOUNT_DELETE, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTRATION_FAIL, REGISTRATION_SUCCESS, UPLOAD_PROFILE_PICTURE, USER_LOADED } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTRATION_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case ACCOUNT_DELETE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        case UPLOAD_PROFILE_PICTURE:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    avatar: action.payload
                }
            };

        default: return state;
    }
};

export default authReducer;