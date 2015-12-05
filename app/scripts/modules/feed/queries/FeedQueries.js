import Relay from 'react-relay';

// The root query for the Feed
export default {
  viewer: () => Relay.QL`
    query {viewer}
  `,
};
