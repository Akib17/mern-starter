import { ADD_EDUCATION, CREATE_PROFILE, DELETE_PROFILE, GET_PROFILE, GET_PROFILES, LOGOUT, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    // Get single Profile
    profile: null,
    // Get all profiles
    profiles: [],
    loading: true,
    error: {},
    education: []
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
        case CREATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case DELETE_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            };
        case ADD_EDUCATION:
            return {
                ...state,
                education: action.payload,
                loading: false
            };
        default:
            return state;
    }

};

export default profileReducer;