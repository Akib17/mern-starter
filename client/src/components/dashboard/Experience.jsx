import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Experience = () => {
    const history = useHistory();
    const [current, setCurrent] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        from: '',
        to: ''
    });

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const checkHandler = e => {
        setCurrent(!current)
    }

    const onSubmitHandler = e => {
        e.preventDefault()

        
    }

    return (
        <div className="pt-32 h-screen bg-gray-100">
            <div className="container w-1/2 items-center mx-auto">

                <h2 className="text-2xl">Add your Experience</h2>

                <form action="" className="mt-5" onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <input name="title" onChange={e => onChangeHandler(e)} type="text" placeholder="Job title" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="company" onChange={e => onChangeHandler(e)} type="text" placeholder="Name of the company" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input name="location" onChange={e => onChangeHandler(e)} type="text" placeholder="Office Location" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="">Starting Date</label>
                        <input name="from" onChange={e => onChangeHandler(e)} type="date" placeholder="Starting Date" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                        {/* <span className="text-sm font-medium">Starting Date</span> */}
                    </div>

                    <div className="mb-4">
                        <label class="flex items-center" onClick={checkHandler} >
                            <input type="checkbox" class="form-checkbox" checked={current} />
                            <span class="ml-2">Current</span>
                        </label>
                    </div>

                    {
                        !current &&
                        <div className="mb-4">
                            <input name="to" onChange={e => onChangeHandler(e)} type="date" placeholder="Completed Date" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                            <span className="text-sm font-medium">Starting Date</span>
                        </div>
                    }


                    <div className="mb-4">
                        <input name="description" onChange={e => onChangeHandler(e)} type="text" placeholder="Description" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <button type="submit" className="inline-block mt-3 bg-gray-600 rounded py-1.5 px-12 text-white"> Add </button>

                </form>

            </div>
        </div>
    );
};

export default Experience;