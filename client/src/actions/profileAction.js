import axios from "axios";
import { ACCOUNT_DELETE, CREATE_PROFILE, DELETE_EDUCATION, DELETE_PROFILE, EDUCATION_FAILED, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

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

// Get Profile by ID
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
export const addEducation = formData => async (dispatch) => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile/addEdu', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
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

// Delete Education
export const deleteEducation = id => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/edu/${id}`);
        dispatch({
            type: DELETE_EDUCATION,
            payload: res.data
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