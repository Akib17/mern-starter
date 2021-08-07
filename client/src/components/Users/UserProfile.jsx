import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProfiles } from '../../actions/profileAction';

const UserProfile = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const { profiles } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfiles());
    }, [getProfiles]);

    let newProfile = profiles && profiles.find(profile => profile._id === profileId);

    console.log(newProfile)

    return (
        <div className="pt-32 h-screen bg-gray-100">
            <div className="container w-1/2 items-center mx-auto">
                <img src={newProfile && newProfile.user.avatar} alt="" />
            </div>
        </div>
    );
};

export default UserProfile;