import Relay from 'react-relay';

// The root queries for the widget site
export default {
  user: (Component) => Relay.QL`
    query {
      viewer {
        user(uuid: $uuid) {
          ${Component.getFragment('user')},
        },
      },
    }
  `,
};
