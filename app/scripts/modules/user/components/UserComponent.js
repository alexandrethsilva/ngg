import React from 'react';

import relay from '../../../utils/relay';
import {compose} from 'redux';
import {connect} from 'react-redux';

import UserFragments from '../fragments/UserFragments';

class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props

    return (
      <div>
        User Component for {user.uuid}
      </div>
    );

  }
}

export default compose(
  relay({
    fragments: UserFragments
  }),
  connect(
    null,
    {},
    (stateProps, actionProps, parentProps) => ({
      user: parentProps.user
    })
  )
)(User);
