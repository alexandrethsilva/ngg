import {GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';
import getUserByUUID from '../../../queries/user/getUserByUUID';
import setUserName from '../../../queries/user/setUserName';
import {wrapField, OP_UPDATE} from '../../../uac';

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
  mutateAndGetPayload: async ({uuid, name}) => {
    const user = await getUserByUUID(uuid);

    if (!user) {
      return null;
    }

    await assertAccess(user, OP_UPDATE);

    return await setUserName(user, name);
  },
}));
