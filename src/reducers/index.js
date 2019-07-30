import { combineReducers } from 'redux';

import user from './user';
import grids from './grids';
import currencies from './currencies';

export default combineReducers({
  user,
  grids,
  currencies,
});