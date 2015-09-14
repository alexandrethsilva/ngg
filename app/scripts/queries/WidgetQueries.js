import Relay from 'react-relay';

// The root queries for the widget site
export default {
  widget: (Component) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('widget')},
      },
    }
  `,
};
