/* @flow */
import relay from 'utils/relay';
import {compose} from 'redux';
import {connect} from 'react-redux';

import UserFragments from 'user/fragments/UserFragments';

import * as actionCreators from 'user/actions/UserActionCreators';

import UserProfile from 'user/components/UserProfile';

export default compose(
  relay({
    fragments: UserFragments,
  }),
  connect(
    null,
    {
      handleSetUserName: actionCreators.setUserName,
      handleSetUserEmail: actionCreators.setUserEmail,
    },
    (stateProps, dispatchProps, ownProps) => ({
      user: ownProps.user,
      handleSetUserName: ({name}) => dispatchProps.handleSetUserName({
        name,
        user: ownProps.user,
      }),
      handleSetUserEmail: ({email}) => dispatchProps.handleSetUserEmail({
        email,
        user: ownProps.user,
      }),
    })
  )
)(UserProfile);
