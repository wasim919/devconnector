import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAlert, removeAlert } from '../../actions/alert';
import { useDispatch } from 'react-redux';
import v4 from 'uuid/v4';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      const id = v4();
      console.log(id);
      dispatch(setAlert('Passwords do not match', 'danger', id));
      setTimeout(() => dispatch(removeAlert(id)), 3000);
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };
  const { name, email, password, password2 } = formData;

  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' action='create-profile.html'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => onChange(e)}
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Register'
          onClick={(e) => registerUser(e)}
        />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};

export default Register;
