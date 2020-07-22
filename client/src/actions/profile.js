import axios from 'axios';
import { GET_PROFILE, PROFILE_ERR } from './types';
import { setAlert } from '../actions/alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: 'Profile doesnot exist', status: 404 },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
