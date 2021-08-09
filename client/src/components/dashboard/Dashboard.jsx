import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProfile } from '../../actions/profileAction';
import ActionButtons from './ActionButtons';
import EducationList from './EducationList';
import ProfilePicture from './ProfilePicture';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProfile())
    }, [getProfile]);

    return (
        <div className="flex h-screen max-w-full w-auto bg-gray-100 pt-28">
            <div className="mx-auto">
                <h2 className="text-lg mb-4 block font-semibold">Welcome, {user && user.name} </h2>
                <ProfilePicture />
                <ActionButtons />
                {!loading && profile && <EducationList key={profile.education._id} />}
            </div>
        </div>
    );
};

export default Dashboard;