import { ADD_EDUCATION, ADD_EXPERIENCE, CREATE_PROFILE, DELETE_EXPERIENCE, DELETE_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_EXPERIENCE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    // Get single Profile
    profile: null,
    // Get all profiles
    profiles: [],
    loading: true,
    error: {},
    education: [],
    experience: []
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
        case ADD_EXPERIENCE:
        case UPDATE_EXPERIENCE:
            return {
                ...state,
                experience: [...state.experience, action.payload],
                loading: false
            };
        case DELETE_EXPERIENCE:
            return {
                ...state,
                experience: state.experience.filter(exp => exp._id !== action.payload),
                loading: false
            };
        default:
            return state;
    }

};

export default profileReducer;