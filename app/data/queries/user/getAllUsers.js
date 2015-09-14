import {executeQuery, cypher} from '../../database';

export default async function getAllUsers() {
  const result = await executeQuery(cypher`
    MATCH (u:User)
    RETURN u
  `);

  return result.map(row => row.u);
};
