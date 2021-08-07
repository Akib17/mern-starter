import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/authAction';
import ActivationAccount from './components/ActivationAccount';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Reset from './components/Auth/Reset';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact';
import Dashboard from './components/dashboard/Dashboard';
import Education from './components/dashboard/Education';
import Experience from './components/dashboard/Experience';
import Profile from './components/dashboard/Profile';
import Home from './components/Home';
import Nav from './components/Nav';
import PrivateRoute from './components/routing/PrivateRoute';
import UserProfile from './components/Users/UserProfile';
import Users from './components/Users/Users';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <BrowserRouter>
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/api/auth/activate/:activateToken" component={ActivationAccount} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/password/reset/verify/:token" component={ResetPassword} />
          <Route exact path="/profile/:profileId" component={UserProfile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/addEducation" component={Education} />
          <PrivateRoute exact path="/addExp" component={Experience} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;