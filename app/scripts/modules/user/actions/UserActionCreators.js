import applyMutation from '../../../utils/applyMutation';

import UserEmailMutation from '../mutations/UserEmailMutation';
import UserNameMutation from '../mutations/UserNameMutation';

export function setUserEmail({user, email}) {
  return () => applyMutation(new UserEmailMutation({user, email}));
}

export function setUserName({user, name}) {
  return () => applyMutation(new UserNameMutation({user, name}));
}
