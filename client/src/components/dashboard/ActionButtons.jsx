import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ActionButtons = () => {
    const { profile } = useSelector(state => state.profile)
    
    return (
        <div className="flex">
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/profile"> {!profile ? 'Create profile' : 'Update profile'} </NavLink>
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/addEducation"> Add Education </NavLink>
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/addExp"> Add Experience </NavLink>
        </div>
    );
};

export default ActionButtons;