import {GraphQLObjectType} from 'graphql';
import {attachFields} from '../../utils';

import * as fields from '../mutations';

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
export default refs => new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => attachFields(refs, fields),
});
