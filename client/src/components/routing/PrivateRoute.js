import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Route {...rest} component={Component} />
    );
};

export default PrivateRoute;