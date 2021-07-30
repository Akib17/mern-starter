import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl font-semibold text-gray-600">MERN Authentication</h1>
            <p className="my-5 text-gray-600 text-lg font-medium">This is a MERN Stack Authentication Project</p>
            <div className="flex">
                <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mr-4" to="/register">Sign up</NavLink>
                <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mr-4" to="/register">Login</NavLink>
            </div>
        </div>
    );
};

export default Home;