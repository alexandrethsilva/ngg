import Relay from 'react-relay';

export default class UserEmailMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        uuid
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation {setUserEmail}`;
  }

  getVariables() {
    return {
      uuid: this.props.user.uuid,
      email: this.props.email,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SetUserEmailPayload {
        user {
          email
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getCollisionKey() {
    return `setUserEmail_${this.props.user.id}`;
  }
}
