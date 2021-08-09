import { ADD_EDUCATION, ADD_EXPERIENCE, CLEAR_CURRENTID, CREATE_PROFILE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_PROFILE, GET_EDUCATION, GET_EXPERIENCE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, SET_CURRENTID, UPDATE_EDUCATION, UPDATE_EXPERIENCE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    // Get single Profile
    profile: null,
    // Get all profiles
    profiles: [],
    loading: true,
    error: {},
    education: [],
    experience: [],
    currentId: ''
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
                education: [...state.education, action.payload],
                loading: false
            };
        case GET_EDUCATION:
            case UPDATE_EDUCATION:
            return {
                ...state,
                education: action.payload,
                loading: false
            }
        case DELETE_EDUCATION:
            return {
                ...state,
                education: state.education.filter(edu => edu._id !== action.payload)
            }
        case ADD_EXPERIENCE:
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
        case GET_EXPERIENCE:
        case UPDATE_EXPERIENCE:
            return {
                ...state,
                experience: action.payload
            }
        case SET_CURRENTID:
            localStorage.setItem('currentId', JSON.stringify(action.payload))
            return {
                ...state,
                currentId: action.payload,
                loading: false
            }
        case CLEAR_CURRENTID:
            localStorage.removeItem('currentId')
            return {
                ...state,
                currentId: '',
                loading: false
            }
        default:
            return state;
    }

};

export default profileReducer;