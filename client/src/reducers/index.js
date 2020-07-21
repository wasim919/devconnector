import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { authReducer } from './auth';
import { profileReducer } from './profile';

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
});

export default rootReducer;
