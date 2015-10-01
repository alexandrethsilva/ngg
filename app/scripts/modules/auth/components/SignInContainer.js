import {compose} from 'redux';
import {connect} from 'react-redux';

import {authorize} from '../actions/AuthActionCreators';

import SignIn from './SignIn';

export default compose(
  connect(
    null,
    { handleAuthorize: authorize },
    (stateProps, dispatchProps/*, ownProps*/) => ({
      handleAuthorize: ({email, password}) => dispatchProps.handleAuthorize({
        email: email,//'a1@example.com',
        password: password,//'12345'
      })
    })
  )
)(SignIn);
