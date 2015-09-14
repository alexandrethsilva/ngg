import {executeQuery, cypher} from '../../database';

export default async function getUserByUUID(uuid) {
  const result = await executeQuery(cypher`
    MATCH (u:User {uuid: ${uuid}})
    RETURN u
  `);

  return result.map(row => row.u).shift();
};
