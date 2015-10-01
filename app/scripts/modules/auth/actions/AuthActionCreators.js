import {createAction} from 'redux-act';
import cookie from 'cookie';

import applyMutation from '../../../utils/applyMutation';

import AuthSessionMutation from '../mutations/AuthSessionMutation';

export const setToken = createAction();

export function readToken() {
  return dispatch => {
    const cookies = cookie.parse(document.cookie);

    if (cookies.token) {
      dispatch(setToken(cookies.token));
    }
  };
}

export function authorize({email, password}) {
  return async (dispatch) => {
    const result = await applyMutation(new AuthSessionMutation({email, password}));
    const token = result.createSession.session.sid;

    document.cookie = `token=${token}: path=/`;

    dispatch(setToken(token));
  };
}

export function init() {
  return dispatch => dispatch(readToken());
}
