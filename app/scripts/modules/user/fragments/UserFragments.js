import Relay from 'react-relay';
import UserMutations from '../mutations/UserMutations';

export default {
  user: () => Relay.QL`
    fragment on User {
      uuid
      email
      ${UserMutations.getFragment('user')}
    }
  `
};
