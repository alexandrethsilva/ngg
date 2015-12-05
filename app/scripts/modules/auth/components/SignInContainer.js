import {compose} from 'redux';
import {connect} from 'react-redux';

import {authorize} from 'auth/actions/AuthActionCreators';

import SignIn from 'auth/components/SignIn';

export default compose(
  connect(
    null,
    { handleAuthorize: authorize },
    (stateProps, dispatchProps/*, ownProps*/) => ({
      handleAuthorize: (/*{email, password}*/) => dispatchProps.handleAuthorize({
        email: 'janedoe@example.com',
        password: '12345',
      }),
      dispatching: false,
    })
  )
)(SignIn);
