import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import getUserSessions from '../../queries/user/getUserSessions';
import {idField, prop, date} from '../../utils';
import {wrapConnectionField} from '../../uac';

export default refs => new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: idField('User'),
    uuid: {
      type: GraphQLString,
      resolve: prop('uuid')
    },
    active: {
      type: GraphQLBoolean,
      resolve: prop('active')
    },
    since: {
      type: GraphQLString,
      resolve: date('since')
    },
    last_seen: {
      type: GraphQLString,
      resolve: date('last_seen')
    },
    name: {
      type: GraphQLString,
      resolve: prop('name')
    },
    birthday: {
      type: GraphQLString,
      resolve: date('birthday')
    },
    email: {
      type: GraphQLString,
      resolve: prop('email')
    },
    sessions: wrapConnectionField({
      type: refs.sessionConnection,
      resolve: (user) => getUserSessions(user)
    })
  }),
  interfaces: [refs.nodeInterface],
});
