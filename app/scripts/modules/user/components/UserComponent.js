/* @flow */
import React from 'react';

import relay from '../../../utils/relay';
import {compose} from 'redux';
import {connect} from 'react-redux';

import UserFragments from '../fragments/UserFragments';

import * as actionCreators from '../actions/UserActionCreators';

class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  imagePlaceholder(width: string = '100%', height: string = '100%'): any {
    return (
      <div
        className="card-img-top"
        style={{
          'backgroundColor': 'rgb(238, 238, 238)',
          'color': 'rgb(170, 170, 170)',
          'textAlign': 'center',
          'width': width,
          'height': height,
          'lineHeight': '180px'
        }}>{width}x{height}</div>
    );
  }

  _handleUserEmailInputBlur(e): any {
    e.preventDefault();

    const {user} = this.props;
    const email = this.refs.userEmailInput.value;

    actionCreators.setUserEmail({user, email});
  }

  render() {
    const { user } = this.props;

    return (
      <div className="col-sm-3">
        <div className="card">
          {this.imagePlaceholder(undefined, '180px')}
          <div className="card-block">
            <h4 className="card-title">{user.name}</h4>
            <input
              ref="userEmailInput"
              type="text"
              onBlur={this._handleUserEmailInputBlur.bind(this)} />
            <p className="card-text">Some excerpt about the user.</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Email</strong> {user.email}</li>
          </ul>
          <div className="card-block">
            <a href="#" className="card-link">View more</a>
            <a href="#" className="card-link">Send message</a>
          </div>
        </div>
      </div>
    );

  }
}

export default compose(
  relay({
    fragments: UserFragments
  }),
  connect(
    state => state,
    actionCreators,
    (stateProps, actionProps, parentProps) => ({
      user: parentProps.user
    })
  )
)(User);
