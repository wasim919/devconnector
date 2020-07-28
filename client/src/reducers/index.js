import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { authReducer } from './auth';
import { profileReducer } from './profile';
import { postReducer } from './postReducer';

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  postReducer,
});

export default rootReducer;
