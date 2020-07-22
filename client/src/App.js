import React, { useEffect, Component } from 'react';
import {
  Navbar,
  Landing,
  Login,
  Register,
  Alert,
  Dashboard,
  CreateProfile,
} from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';
import { PrivateRoute } from './components';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
          </Switch>
        </section>
      </>
    </Router>
  );
};

export default App;
