import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addEducation, getAllEducation } from '../../actions/profileAction';

const Education = () => {
    const dispatch = useDispatch();
    const currentId = JSON.parse(localStorage.getItem('currentId'));
    const { education, loading } = useSelector(state => state.profile);
    const history = useHistory();
    const [currentOn, setCurrentOn] = useState(true);
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: ''
    });

    useEffect(() => {
        dispatch(getAllEducation())
        if (education && !loading) {
            const edu = education.find(ed => ed?._id === currentId)
            setFormData(edu)
            setCurrentOn(edu?.current)
        }
    }, [getAllEducation, loading, formData]);

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const checkHandler = e => {
        setCurrentOn(!currentOn);
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const data = { ...formData, currentOn };

        if (currentId) {
            console.log(data)
        } else {
            console.log(data)
        }

        // dispatch(addEducation(data, history));
    };

    return (
        <div className="pt-32 h-screen bg-gray-100">
            <div className="container w-1/2 items-center mx-auto">

                <h2 className="text-2xl">{currentId ? 'Update' : 'Add'} your education history</h2>

                <form action="" className="mt-5" onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <input value={formData?.school} name="school" onChange={e => onChangeHandler(e)} type="text" placeholder="Your school/college/university" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                        {/* <span className="text-sm font-medium">Ex: Javascript, React, Nodejs</span> */}
                    </div>

                    <div className="mb-4">
                        <input value={formData?.degree} name="degree" onChange={e => onChangeHandler(e)} type="text" placeholder="Name of degree" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <input value={formData?.fieldofstudy} name="fieldofstudy" onChange={e => onChangeHandler(e)} type="text" placeholder="Your subject" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="">Starting Date</label>
                        <input value={formData?.from} name="from" onChange={e => onChangeHandler(e)} type="date" placeholder="Starting Date" className="w-full py-1.5 pl-3 text-gray-800 focus:outline-none" />
                        {/* <span className="text-sm font-medium">Starting Date</span> */}
                    </div>

                    <div className="mb-4">
                        <label class="flex items-center" onClick={checkHandler} >
                            <input type="checkbox" class="form-checkbox" checked={currentOn} />
                            <span class="ml-2">Current</span>
                        </label>
                    </div>

                    {
                        !currentOn &&
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

export default Education;