import Relay from 'react-relay';

import UserEmailMutation from 'user/mutations/UserEmailMutation';
import UserNameMutation from 'user/mutations/UserNameMutation';

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
