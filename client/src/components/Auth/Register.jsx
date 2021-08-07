import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login, registration } from '../../actions/authAction';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(registration(form, history));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="shadow px-8 rounded-sm bg-gray-600 text-white w-full max-w-md text-center py-12">
                <h2 className="text-2xl">Register a new account</h2>
                <form action="" className="mt-5" onSubmit={onSubmitHandler} >
                    
                    <input name="name" onChange={e => onChangeHandler(e)} type="text" placeholder="Your Name" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />

                    <input name="email" onChange={e => onChangeHandler(e)} type="email" placeholder="Your Email" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />

                    <input name="password" onChange={e => onChangeHandler(e)} type="password" placeholder="Your Password" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />

                    <input name="phone" onChange={e => onChangeHandler(e)} type="number" placeholder="Your Phone" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />

                    <button type="submit" className="bg-gray-300 text-gray-800 font-semibold py-1.5 w-full">Sign up</button>
                </form>
                <h2 className="mt-5 text-gray-300">Already have an account? <NavLink className="underline" to="/login"> Login </NavLink></h2>
            </div>
        </div>
    );
};

export default Register;