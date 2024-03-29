import Relay from 'react-relay';

export default class UserNameMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        uuid
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation {setUserName}`;
  }

  getVariables() {
    return {
      uuid: this.props.user.uuid,
      name: this.props.name,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SetUserNamePayload {
        user {
          name
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
    return `setUserName_${this.props.user.id}`;
  }
}
