import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createProfile, getProfile } from '../../actions/profileAction';

const Profile = () => {
    const { profile } = useSelector(state => state.profile);
    const history = useHistory()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        website: '',
        skills: '',
    });

    useEffect(() => {
        dispatch(getProfile());
    }, [getProfile]);

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(createProfile(formData, history))
    };

    return (
        <div className="pt-32 h-screen bg-gray-100">
            <div className="container w-1/2 items-center mx-auto">

                <h2 className="text-2xl"> {!profile ? 'Create your profile' : 'Update your profile'} </h2>

                <form action="" className="mt-5" onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <input name="skills" onChange={e => onChangeHandler(e)} type="text" placeholder="Your skills *" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                        <span className="text-sm font-medium">Ex: Javascript, React, Nodejs</span>
                    </div>

                    <div className="mb-4">
                        <input name="website" onChange={e => onChangeHandler(e)} type="text" placeholder="Your website" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="facebook" onChange={e => onChangeHandler(e)} type="text" placeholder="Your facebook profile" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="twitter" onChange={e => onChangeHandler(e)} type="text" placeholder="Your twitter profile" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="linkedin" onChange={e => onChangeHandler(e)} type="text" placeholder="Your linkedin profile" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="instagram" onChange={e => onChangeHandler(e)} type="text" placeholder="Your instagram profile" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="youtube" onChange={e => onChangeHandler(e)} type="text" placeholder="Your youtube channel" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <button type="submit" className="inline-block mt-3 bg-gray-600 rounded py-1.5 px-12 text-white"> {!profile ? 'Create' : 'Update'} </button>

                </form>

            </div>
        </div>
    );
};

export default Profile;