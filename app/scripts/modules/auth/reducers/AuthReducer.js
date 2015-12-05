import {createReducer} from 'redux-act';
import * as actions from 'auth/actions/AuthActionCreators';

export default createReducer({
  [actions.setToken]: (state, token) => token,
}, null);
