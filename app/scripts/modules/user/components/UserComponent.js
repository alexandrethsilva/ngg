import React/*, {PropTypes}*/ from 'react';

import relay from '../../../utils/relay';
import {compose} from 'redux';
import {connect} from 'react-redux';

import UserFragments from '../fragments/UserFragments';

class User extends React.Component {
  static propTypes = {}

  render() {

    return (
      <div>
        User Component
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
    (/*stateProps, actionProps, parentProps*/) => ({})
  )
)(User);
