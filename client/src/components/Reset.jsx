import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Reset = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const onChangeHandler = e => {
        setEmail({
            email: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('/api/auth/password/reset/request', email)
            .then(res => {
                setMessage(res.data.msg)
                e.target.reset()
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
            .catch(err => {
                console.log(err)
                // setMessage(err.data.msg)
            })
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
            {message && <h2 className="py-2 px-5 bg-green-600 rounded text-white text-center mb-5"> {message} </h2>}
            <div className="shadow px-8 rounded-sm bg-gray-600 text-white w-full max-w-md text-center py-12">
                <h2 className="text-2xl">Provide your email to verify</h2>
                <form action="" className="mt-5" onSubmit={onSubmitHandler} >
                <input name="email" onChange={e => onChangeHandler(e)} type="email" placeholder="Your Email" className="w-full py-1.5 pl-3 mb-4 text-gray-800 focus:outline-none" />
                    <button type="submit" className="bg-gray-300 text-gray-800 font-semibold py-1.5 w-full">Reset</button>
                </form>
            </div>
        </div>
    );
};

export default Reset;