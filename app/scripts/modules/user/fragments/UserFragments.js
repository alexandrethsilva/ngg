import Relay from 'react-relay';

import UserEmailMutation from '../mutations/UserEmailMutation';
import UserNameMutation from '../mutations/UserNameMutation';

export default {
  user: () => Relay.QL`
    fragment on User {
      uuid
      name
      email
      ${UserEmailMutation.getFragment('user')}
      ${UserNameMutation.getFragment('user')}
    }
  `
};
