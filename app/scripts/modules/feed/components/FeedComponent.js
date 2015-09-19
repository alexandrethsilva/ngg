import 'babel/polyfill';
import React, {PropTypes} from 'react';

import relay from '../../../utils/relay';
import {compose} from 'redux';
import {connect} from 'react-redux';

import FeedFragments from '../fragments/FeedFragments';
import UserComponent from '../../user/components/UserComponent';

class Feed extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className="Feed">
        {this.props.children}
      </div>
    );
  }
}

export default compose(
  relay({
    fragments: FeedFragments
  }),
  connect(
    null,
    {},
    (stateProps, actionProps, parentProps) => ({
      ...stateProps,
      children: [
        <div key="users">
          {parentProps.viewer.users.edges.map(edge => (
            <UserComponent key={edge.cursor} user={edge.node} />
          ))}
        </div>
      ]
    })
  )
)(Feed);