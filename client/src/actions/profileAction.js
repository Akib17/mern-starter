import axios from "axios";
import { ACCOUNT_DELETE, ADD_EDUCATION, ADD_EXPERIENCE, CREATE_PROFILE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_PROFILE, EDUCATION_FAILED, GET_EDUCATION, GET_EXPERIENCE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, SET_CURRENTID, UPDATE_EDUCATION, UPDATE_EXPERIENCE } from "./types";

// Get all profile
export const getProfiles = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Get single Profile
export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Get Profile by ID for Public profile Details
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Create and Update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        });

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile/addEdu', formData, config);
        dispatch({
            type: ADD_EDUCATION,
            payload: res.data
        });

        history.push('/dashboard');

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Delete Education
export const deleteEducation = id => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/edu/${id}`);
        dispatch({
            type: DELETE_EDUCATION,
            payload: id
        });

    } catch (err) {
        dispatch({
            type: EDUCATION_FAILED,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Get all Education
export const getAllEducation = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/education/all');

        console.log(res.data)

        dispatch({
            type: GET_EDUCATION,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Update Education
export const updateEducation = (id, formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put(`/api/profile/education/${id}`, formData, config);

        dispatch({
            type: UPDATE_EDUCATION,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Delete account and profile
export const deleteProfile = () => async (dispatch) => {
    if (window.confirm('Are you sure? Would you like to delete your account permanently?')) {
        try {
            await axios.delete('/api/profile');

            dispatch({
                type: DELETE_PROFILE
            });

            dispatch({ type: ACCOUNT_DELETE });

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status
                }
            });
        }
    }
};


// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile/experience', formData, config);

        dispatch({
            type: ADD_EXPERIENCE,
            payload: res.data
        });

        history.push('/dashboard');

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Update Experience
export const updateExperience = (id, formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`/api/profile/experience/${id}`, formData, config);

        dispatch({
            type: UPDATE_EXPERIENCE,
            payload: res.data
        });

        history.push('/dashboard');

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Delete Experience
export const deleteExperience = id => async (dispatch) => {
    try {
        await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: DELETE_EXPERIENCE,
            payload: id
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

// Get all Experience
export const getAllExperience = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/experience/all');

        dispatch({
            type: GET_EXPERIENCE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};


// Edit Education/Experience
export const setCurrentId = id => async (dispatch) => {
    try {
        dispatch({
            type: SET_CURRENTID,
            payload: id
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};