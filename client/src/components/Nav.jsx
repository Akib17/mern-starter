import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="bg-gray-700 flex justify-between px-10 h-20 items-center fixed w-full">
            <NavLink to="/" className="text-white font-semibold"> <span> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>_ MERN Auth</span> </NavLink>

            <div className="flex">
                <NavLink to="/users" className="text-gray-400 tracking-wide mr-4">User</NavLink>
                <NavLink to="/register" className="text-gray-400 tracking-wide mr-4">Register</NavLink>
                <NavLink to="/login" className="text-gray-400 tracking-wide mr-4">Login</NavLink>
                <NavLink to="/contact" className="text-gray-400 tracking-wide mr-4">Contact</NavLink>
            </div>

        </div>
    );
};

export default Nav;