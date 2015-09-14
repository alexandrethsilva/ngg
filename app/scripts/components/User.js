import 'babel/polyfill';

import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class User extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>User {user.email}</h1>
        <div>
          {user.uuid}
        </div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    widget: () => Relay.QL`
      fragment on User {
        uuid,
        email,
      }
    `,
  },
});
