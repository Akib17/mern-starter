import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profileAction';
import UserLists from './UserLists';

const Users = () => {
    const dispatch = useDispatch();
    const { profiles } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfiles());
    }, [getProfiles]);

    return (
        <div className="pt-32 h-screen bg-gray-100">
            <div className="container w-1/2 items-center mx-auto">
                {
                    profiles ? profiles.map(profile => (
                        <UserLists key={profile._id} profile={profile} />
                    )) : (
                        <div className="bg-red-600 text-white py-2 px-10 text-center">Sorry, No users available</div>
                    )
                }
            </div>
        </div>
    );
};

export default Users;