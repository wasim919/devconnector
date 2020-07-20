import { combineReducers } from 'redux';
import { alertReducer } from './alert';

const rootReducer = combineReducers({
  alertReducer,
});

export default rootReducer;
