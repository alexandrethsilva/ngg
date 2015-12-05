import Relay from 'react-relay';

export default class UserMutations extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        uuid
        active
        since
        last_seen
        name
        birthday
        email
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation {setEmail}`;
  }

  getVariables() {
    return {
      uuid: this.props.user.uuid,
      email: this.props.email,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SetEmailPayload {
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
    return `setEmail_${this.props.user.id}`;
  }

}
