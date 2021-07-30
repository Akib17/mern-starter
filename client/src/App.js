import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActivationAccount from './components/ActivationAccount';
import Contact from './components/Contact';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import User from './components/User';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={User} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/api/auth/activate/:activateToken" component={ActivationAccount} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
