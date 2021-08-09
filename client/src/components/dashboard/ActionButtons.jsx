import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CLEAR_CURRENTID } from '../../actions/types';

const ActionButtons = () => {
    const { profile } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    
    return (
        <div className="flex">
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/profile"> {!profile ? 'Create profile' : 'Update profile'} </NavLink>
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/education" onClick={() => dispatch({type: CLEAR_CURRENTID})} > Add Education </NavLink>
            <NavLink className="text-white bg-gray-700 px-10 py-2 rounded-sm mt-6 inline-block mr-3" to="/experience"> Add Experience </NavLink>
        </div>
    );
};

export default ActionButtons;