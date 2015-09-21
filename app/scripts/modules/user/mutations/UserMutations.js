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
}
