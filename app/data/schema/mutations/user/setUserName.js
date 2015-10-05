import {GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';
import setUserName from '../../../queries/user/setUserName';
import {wrapField, OP_UPDATE} from '../../../acl';

export default refs => wrapField(assertAccess => mutationWithClientMutationId({
  name: 'SetUserName',
  inputFields: {
    uuid: {type: GraphQLString},
    name: {type: GraphQLString},
  },
  outputFields: {
    user: wrapField({
      type: refs.user,
      resolve: user => user,
    }),
  },
  mutateAndGetPayload: async ({uuid, name}, {rootValue}) => {
    const user = await rootValue.loaders.User.load(uuid);

    if (!user) {
      return null;
    }

    await assertAccess(user, OP_UPDATE);

    return await setUserName(user, name);
  },
}));
