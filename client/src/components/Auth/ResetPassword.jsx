import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const history = useHistory();

    const url = `/api/auth/password/verify/${token}`;

    const onChangeHandler = e => {
        setPassword({
            password: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post(url, password)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        setTimeout(() => {
            history.push('/login')
        }, 2000)
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">

            <div className="shadow px-8 rounded-sm bg-gray-600 text-white w-full max-w-md text-center py-12">
                <h2 className="text-2xl">Reset your password</h2>
                <form action="" className="mt-5" onSubmit={onSubmitHandler} >
                    <input name="password" onChange={e => onChangeHandler(e)} type="password" placeholder="Your Password" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />
                    <button type="submit" className="bg-gray-300 text-gray-800 font-semibold py-1.5 w-full">Reset</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;