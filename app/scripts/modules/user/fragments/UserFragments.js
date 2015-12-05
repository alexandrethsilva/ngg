import Relay from 'react-relay';

import UserEmailMutation from '../mutations/UserEmailMutation';
import UserNameMutation from '../mutations/UserNameMutation';

export default {
  user: () => Relay.QL`
    fragment on User {
      uuid
      active
      since
      last_seen
      name
      birthday
      email
      ${UserNameMutation.getFragment('user')}
      ${UserEmailMutation.getFragment('user')}
    }
  `,
};
