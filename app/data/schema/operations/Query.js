import {GraphQLObjectType} from 'graphql';
import {attachFields} from '../../utils';

import * as fields from '../queries';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
export default refs => new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    viewer: {
      type: new GraphQLObjectType({
        name: 'Viewer',
        fields: () => attachFields(refs, fields),
      }),
      resolve: (root) => root,
    },
  }),
});
