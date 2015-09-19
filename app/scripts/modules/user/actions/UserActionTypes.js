/* @flow */
import mirror from 'keymirror';

export default {
  USERS: mirror({
    CREATE_USER: null,
    UPDATE_USER: null,
    REMOVE_USER: null,
    AUTHORIZE_USER: null
  })
};
