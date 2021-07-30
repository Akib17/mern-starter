import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const ActivationAccount = () => {
    const [error, setError] = useState(true);
    const [msg, setMsg] = useState('');

    const { activateToken } = useParams();

    useEffect(() => {
        let url = `/api/auth/activate/${activateToken}`;

        axios.get(url)
            .then(({data}) => {
                setMsg('');
                setError(data.error)
            })
            .catch(({ data }) => {
                console.log(data)
                setMsg(data.msg);
                setError(data.error)
            });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="shadow p-4 rounded-sm bg-gray-600 text-white w-full max-w-md text-center py-12">
                {msg && <h2 className="text-2xl"> {msg} </h2>}
                {error && <h2 className="text-2xl mt-5"> {error} </h2>}
                <NavLink className="block mt-5 underline" to="/dashboard">Go to Dashboard</NavLink>
            </div>
        </div>
    );
};

export default ActivationAccount;