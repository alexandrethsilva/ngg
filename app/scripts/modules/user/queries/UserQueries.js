import Relay from 'react-relay';

// The root queries for the widget site
export default {
  user: (Component) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('user')},
      },
    }
  `,
};
