/**
 * @Author Cameron Wark
*/
import { combineReducers } from 'redux';

import auth from './auth';

// combines all reducers into one
export default combineReducers({ auth });
