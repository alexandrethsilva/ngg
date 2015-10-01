import {createReducer} from 'redux-act';
import * as actions from '../actions/AuthActionCreators';

export default createReducer({
  [actions.setToken]: (state, token) => token,
}, null);
