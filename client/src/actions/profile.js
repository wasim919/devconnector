import axios from 'axios';
import { GET_PROFILE, PROFILE_ERR } from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
