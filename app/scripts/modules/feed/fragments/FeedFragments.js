import Relay from 'react-relay';
import UserComponent from '../../user/components/UserComponent';

export default {
  viewer: () => Relay.QL`
    fragment on Viewer {
      users(first: 10) {
        edges {
          cursor
          node {
            ${UserComponent.getFragment('user')}
          }
        }
      }
    }
  `
};
