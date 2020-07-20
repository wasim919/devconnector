import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, id) => {
  return {
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  };
};

export const removeAlert = (id) => {
  return {
    type: REMOVE_ALERT,
    payload: {
      id,
    },
  };
};
