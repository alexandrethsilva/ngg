import {executeQuery, cypher} from '../../database';

export default async function getUserNeighborhood(user) {
  const result = await executeQuery(cypher`
    MATCH (u:User {uuid: ${user.properties.uuid}})
    MATCH (n:Neighborhood)<-[:LIVES_IN]-(u)
    return n
  `);

  return result.map(row => row.n);
}