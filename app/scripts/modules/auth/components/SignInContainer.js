import {compose} from 'redux';
import {connect} from 'react-redux';

import {authorize} from '../actions/AuthActionCreators';

import SignIn from './SignIn';

export default compose(
  connect(
    null,
    { handleAuthorize: authorize },
    (stateProps, dispatchProps/*, ownProps*/) => ({
      handleAuthorize: (/*{email, password}*/) => dispatchProps.handleAuthorize({
        email: 'johndoe@example.com',
        password: '12345'
      }),
      dispatching: false
    })
  )
)(SignIn);
