import React, { useEffect } from 'react';
import { Navbar, Landing, Login, Register, Alert } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';

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
          </Switch>
        </section>
      </>
    </Router>
  );
};

export default App;
