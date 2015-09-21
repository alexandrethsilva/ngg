import Relay from 'react-relay';

import UserMutations from '../mutations/UserMutations';
import UserEmailMutation from '../mutations/UserEmailMutation';
import UserNameMutation from '../mutations/UserNameMutation';

export default {
  user: () => Relay.QL`
    fragment on User {
      uuid
      name
      birthday
      email
      ${UserMutations.getFragment('user')}
      ${UserEmailMutation.getFragment('user')}
      ${UserNameMutation.getFragment('user')}
    }
  `
};
