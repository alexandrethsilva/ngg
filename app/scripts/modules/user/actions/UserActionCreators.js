import applyMutation from 'utils/applyMutation';

import UserEmailMutation from 'user/mutations/UserEmailMutation';
import UserNameMutation from 'user/mutations/UserNameMutation';

export function setUserEmail({user, email}) {
  return () => applyMutation(new UserEmailMutation({user, email}));
}

export function setUserName({user, name}) {
  return () => applyMutation(new UserNameMutation({user, name}));
}
