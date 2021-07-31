import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/authAction';
import ActivationAccount from './components/ActivationAccount';
import Contact from './components/Contact';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import Reset from './components/Reset';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/routing/PrivateRoute';
import User from './components/User';
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
          <Route exact path="/users" component={User} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/api/auth/activate/:activateToken" component={ActivationAccount} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/password/reset/verify/:token" component={ResetPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;