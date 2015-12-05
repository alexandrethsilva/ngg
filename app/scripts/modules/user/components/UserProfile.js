/* @flow */
import React, {PropTypes} from 'react';

export default class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    handleSetUserName: PropTypes.func.isRequired,
    handleSetUserEmail: PropTypes.func.isRequired,
  }

  imagePlaceholder(width: string = '100%', height: string = '100%', backgroundColor: ?string = 'rgb(238, 238, 238)'): ReactElement { // eslint-disable-line no-undef
    return (
      <div
        className="card-img-top"
        style={{
          'backgroundColor': backgroundColor,
          'color': 'rgb(170, 170, 170)',
          'textAlign': 'center',
          'width': width,
          'height': height,
          'lineHeight': '180px',
        }}>{width}x{height}</div>
    );
  }

  _handleUserNameInputBlur(): void {
    const name = this.refs.userNameInput.value;
    this.props.handleSetUserName({name});
  }

  render() {
    const {user} = this.props;

    return (
      <div className="col-sm-3">
        <div className="card">
          {this.imagePlaceholder(undefined, '180px')}
          <div className="card-block">
            <h4 className="card-title">{user.name}</h4>
            <input
              ref="userNameInput"
              type="text"
              onBlur={this._handleUserNameInputBlur.bind(this)} />
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
