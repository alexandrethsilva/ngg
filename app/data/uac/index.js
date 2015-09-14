import {
  allow,
  deny,
  someRule,
  OP_CREATE,
  OP_READ,
  OP_UPDATE,
  OP_DELETE,
} from 'access-rule';

import {
  byType,
  complex,
  admin,
  self,
  owner,
} from './rules';

export {
  OP_CREATE,
  OP_READ,
  OP_UPDATE,
  OP_DELETE,
} from 'access-rule';

export {default as wrapField} from './wrapField';
export {default as wrapConnectionField} from './wrapConnectionField';

export default byType({
  CreateSessionPayload: allow,
  CreateUserPayload: allow,
  SetEmailPayload: allow,

  Node: allow,

  User: complex(allow, {                // UserUAC(User, OP_READ | OP_UPDATE | OP_DELETE)
    [OP_CREATE]: allow,                 // UserUAC(User, OP_CREATE) | UserUAC(user, OP_CREATE)
    [OP_READ]: allow,                   // UserUAC(user, OP_READ)
    [OP_UPDATE]: someRule(admin, self), // UserUAC(user, OP_UPDATE)
    [OP_DELETE]: deny,                  // UserUAC(user, OP_DELETE)
  }),

  Session: complex(allow, {
    [OP_CREATE]: allow,
    [OP_READ]: owner,
    [OP_UPDATE]: deny,
    [OP_DELETE]: owner,
  }),
});
