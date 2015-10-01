import {executeQuery, cypher} from '../../database';

export default async function setUserName(user, name) {
  const result = await executeQuery(cypher`
    MATCH (u:User {uuid: ${user.properties.uuid}})
    SET u.name = ${name}
    RETURN u
  `);

  return result.map(row => row.u).shift();
};
