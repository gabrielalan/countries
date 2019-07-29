import { combineReducers } from 'redux';

import user from './user';
import grids from './grids';

export default combineReducers({
  user,
  grids
});