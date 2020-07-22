import axios from 'axios';
import { GET_PROFILE, PROFILE_ERR } from './types';

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
