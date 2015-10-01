import React, {PropTypes} from 'react';

export default class SignIn extends React.Component {
  static propTypes = {
    handleAuthorize: PropTypes.func.isRequired,
    dispatching: PropTypes.bool.isRequired,
  }

  render() {
    const {
      handleAuthorize,
      dispatching,
    } = this.props;

    return (
      <button
        disabled={dispatching}
        onClick={handleAuthorize}>

        Express SignIn

      </button>
    );
  }
}
