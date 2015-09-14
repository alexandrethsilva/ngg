import {executeQuery, cypher} from '../../database';

export default async function getObjectById(id) {
  const result = await executeQuery(cypher`
    MATCH (object)
    WHERE id(object) = ${id}
    RETURN object
  `);

  return result.map(row => row.object).shift();
};
