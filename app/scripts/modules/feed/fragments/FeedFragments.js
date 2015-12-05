import Relay from 'react-relay';
import UserProfileContainer from '../../user/components/UserProfileContainer';

export default {
  viewer: () => Relay.QL`
    fragment on Viewer {
      users(first: 10) {
        edges {
          cursor
          node {
            ${UserProfileContainer.getFragment('user')}
          }
        }
      }
    }
  `,
};
