import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const loginUser = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const { email, password } = formData;

  return (
    <>
      <h1 className='large text-primary'>Log In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Log Into Your Account
      </p>
      <form className='form' action='create-profile.html'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Login'
          onClick={(e) => loginUser(e)}
        />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
