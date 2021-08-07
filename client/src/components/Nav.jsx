import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../actions/authAction';
import { getProfile } from '../actions/profileAction';
import { LOGOUT, UPDATE_PROFILE } from '../actions/types';

const Nav = () => {
    const { isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const doLogout = e => {
        dispatch({ type: LOGOUT })
        dispatch({type: UPDATE_PROFILE})
    }
    
    return (
        <div className="bg-gray-700 flex justify-between px-10 h-20 items-center fixed w-full">
            <NavLink to="/" className="text-white font-semibold"> <span> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>_ MERN Auth</span> </NavLink>

            <div className="flex">
                <NavLink to="/users" className="text-gray-400 tracking-wide mr-4">User</NavLink>
                {!isAuthenticated && <NavLink to="/register" className="text-gray-400 tracking-wide mr-4">Register</NavLink>}

                {isAuthenticated ? (
                    <div onClick={doLogout} className="text-gray-400 tracking-wide mr-4 cursor-pointer">Logout</div>
                ): (
                    <NavLink to="/login" className="text-gray-400 tracking-wide mr-4">Login</NavLink>   
                )}

                {isAuthenticated && <NavLink to="/dashboard" className="text-gray-400 tracking-wide mr-4">Dashboard</NavLink>}
                
                <NavLink to="/contact" className="text-gray-400 tracking-wide mr-4">Contact</NavLink>
            </div>

        </div>
    );
};

export default Nav;