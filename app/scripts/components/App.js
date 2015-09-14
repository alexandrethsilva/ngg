import 'babel/polyfill';

import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>User list</h1>
        <ul>
          {this.props.viewer.edges.map(edge =>
            <li key={edge.node.uuid}>
              <Link to={`/user/${edge.node.uuid}`}>
                {edge.node.email} (ID: {edge.node.uuid})
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        uuid,
        email,
      }
    `,
  },
});
