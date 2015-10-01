import {GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';
import getUserByUUID from '../../../queries/user/getUserByUUID';
import setUserEmail from '../../../queries/user/setUserEmail';
import {wrapField, OP_UPDATE} from '../../../uac';

export default refs => wrapField(assertAccess => mutationWithClientMutationId({
  name: 'SetUserEmail',
  inputFields: {
    uuid: {type: GraphQLString},
    email: {type: GraphQLString},
  },
  outputFields: {
    user: wrapField({
      type: refs.user,
      resolve: user => user,
    }),
  },
  mutateAndGetPayload: async ({uuid, email}) => {
    const user = await getUserByUUID(uuid);

    if (!user) {
      return null;
    }

    await assertAccess(user, OP_UPDATE);

    return await setUserEmail(user, email);
  },
}));
