import React from 'react';
import { NavLink } from 'react-router-dom';

const UserLists = ({ profile }) => {
    return (
        <div className="shadow px-8 grid grid-cols-2 justify-between rounded-sm bg-gray-300 text-gray-700 w-full py-12 mb-6">
            <div className="flex">
                <img src={profile && profile.user.avatar} className="rounded-full w-28 h-28" alt="" />
                <div className="ml-10">
                    <h2 className="text-lg font-medium"> {profile && profile.user.name} </h2>
                    <h2 className="font-medium"> {profile && profile.user.email} </h2>
                    <p className="text-sm font-semibold"> {profile && profile.user.phone} </p>
                    <NavLink className="bg-gray-700 text-white py-1.5 px-10 inline-block mt-5 rounded" to={`/profile/${profile?._id}`} >View profile</NavLink>
                </div>
            </div>
            <div>
                <div className="bg-gray-400 h-full rounded p-4">
                    <h3 className="text-gray-700 font-semibold text-md"> <span className="text-sm font-semibold bg-gray-700 text-white rounded p-1">Status:</span> {profile && profile.status} </h3>
                    <div className="mt-4">
                        {
                            profile && profile.skills.map(skill => (
                                <span className="text-white bg-gray-700 px-3 py-1 mr-2 rounded mb-2 inline-block"> {skill} </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLists;