import Relay from 'react-relay';

// The root queries for the main site
export default {
  viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')},
      },
    }
  `,
};
