import DataLoader from 'dataloader';
import {executeQuery} from '../database';

import createNodeLoader from './createNodeLoader';

export default function createLoaders() {
  const queriesLoader = new DataLoader(queries => executeQuery({queries}));

  return {
    queries: queriesLoader,
    User: createNodeLoader({
      queriesLoader,
      nodeLabel: 'User',
      idFieldName: 'uuid',
    }),
    Session: createNodeLoader({
      queriesLoader,
      nodeLabel: 'Session',
      idFieldName: 'sid',
    })
  };
}
