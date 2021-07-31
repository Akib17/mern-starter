import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../actions/authAction';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(login(form, history));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="shadow px-8 rounded-sm bg-gray-600 text-white w-full max-w-md text-center py-12">
                <h2 className="text-2xl">Login into your account</h2>
                <form action="" className="mt-5" onSubmit={onSubmitHandler} >
                    <input name="email" onChange={e => onChangeHandler(e)} type="email" placeholder="Your Email" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />
                    <input name="password" onChange={e => onChangeHandler(e)} type="password" placeholder="Your Password" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />
                    <button type="submit" className="bg-gray-300 text-gray-800 font-semibold py-1.5 w-full">Login</button>
                </form>
                <h2 className="mt-2 text-gray-300">Forgot password? <NavLink className="underline" to="/reset"> Reset now </NavLink></h2>
                <h2 className="mt-5 text-gray-300">Don't have any account? <NavLink className="underline" to="/register"> Register </NavLink></h2>
            </div>
        </div>
    );
};

export default Login;