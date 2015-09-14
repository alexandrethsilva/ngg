import {GraphQLID} from 'graphql';
import getUserByUUID from '../../queries/user/getUserByUUID';
import {wrapField} from '../../uac';

export default refs => wrapField({
  type: refs.user,
  args: {
    uuid: {type: GraphQLID},
  },
  resolve: (root, args) => getUserByUUID(args.uuid),
});
