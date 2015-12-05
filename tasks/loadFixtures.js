import {readFileAsync} from 'fs-extra-promise';
import {main} from './utils';
import {executeQuery, cypher} from '../app/data/database';

main(async () => {
  const fixturesFile = './app/data/fixtures/fixtures.cypher';

  const fixtures = (await readFileAsync(fixturesFile))
    .toString()
    .split(/;\n/);

  await executeQuery(cypher`
    MATCH (n)
    OPTIONAL MATCH ()-[e]-()
    DELETE n, e
  `);

  for (const query of fixtures) {
    await executeQuery({
      query,
    });
  }
});
