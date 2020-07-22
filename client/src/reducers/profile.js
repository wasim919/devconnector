import { GET_PROFILE, PROFILE_ERR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case PROFILE_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
