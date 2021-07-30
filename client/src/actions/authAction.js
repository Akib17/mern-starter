import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTRATION_FAIL, REGISTRATION_SUCCESS, USER_LOADED } from "./types";

export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};


/**
 * @Registration
 */
export const registration = ({ name, email, password, phone }, history) => async (dispatch) => {

    try {
        const body = { name, email, password, phone };
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/auth/signup', body, config);

        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        history.push('/dashboard')

    } catch (err) {
        const errors = err.response;
        console.log(errors);
        dispatch({
            type: REGISTRATION_FAIL
        });
    }

};


/**
 * @Login
 */
export const login = ({email, password}, history) => async ( dispatch ) => {
    const body = { email, password };
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        history.push('/dashboard')

    } catch (err) {
        const errors = err.response;
        console.log(errors);
        dispatch({ type: LOGIN_FAIL });
    }
};


/**
 * @Logout
 */
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};