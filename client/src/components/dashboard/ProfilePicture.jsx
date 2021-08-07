import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePicture } from '../../actions/authAction';

const ProfilePicture = () => {
    const { user } = useSelector(state => state.auth);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const dispatch = useDispatch();

    const onSubmitHandler = e => {
        e.preventDefault();

        if (file) {
            const data = new FormData();
            data.append('avatar', file);
            dispatch(uploadProfilePicture(data, () => {
                setFile(null);
            }));
            setPreviewUrl('')
        }
    };

    return (
        <Fragment>
            <div className="flex items-center">
                {user && <img className="rounded-full w-36 h-36" src={previewUrl ? previewUrl : user.avatar} alt="" />}
                <div>
                    <form action="" className="ml-6" onSubmit={onSubmitHandler} >
                        <label
                            class="w-64 flex flex-col items-center px-4 py-2 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-700 hover:text-white text-gray-600 ease-linear transition-all duration-150">
                            <span class="mt-2 text-base leading-normal">Upload profile picture</span>
                            <input type='file' class="hidden" name="file" id="imgFile" onChange={e => {
                                if (e.target.files[0]) {
                                    setFile(e.target.files[0]);
                                    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                                }
                            }} />
                        </label>
                        <button type="submit" className="bg-gray-300 text-gray-800 font-semibold py-1.5 w-full mt-2">Upload</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ProfilePicture;