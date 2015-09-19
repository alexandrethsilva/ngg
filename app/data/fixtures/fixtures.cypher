CREATE CONSTRAINT ON (u:User) ASSERT u.uuid IS UNIQUE;
CREATE CONSTRAINT ON (u:User) ASSERT u.email IS UNIQUE;
CREATE CONSTRAINT ON (s:Session) ASSERT s.sid IS UNIQUE;

CREATE (admin:User {
  uuid: "e61d795e-fdf8-4cb7-a280-8542e66ebb25",
  active: true,
  since: "2015-09-19T16:06:40.578Z",
  last_seen: "2015-09-19T16:06:40.578Z",
  name: "Alexandre Theodoro da Silva",
  birthday: "1987-02-18T16:06:40.578Z",
  email: "a1@example.com",
  password: "12345678",
  role: "ADMIN"
})

CREATE (user:User {
  uuid: "e624a76a-e5c0-4388-bd02-612e55dc2299",
  active: true,
  since: "2015-09-19T16:06:40.578Z",
  last_seen: "2015-09-19T16:06:40.578Z",
  name: "Annette Dobler",
  birthday: "1983-11-11T16:06:40.578Z",
  email: "u1@example.com",
  password: "12345678",
  role: "USER"
})

CREATE (userSession:Session {
  sid: 'user'
})
CREATE (user)-[:OWNS]->(userSession)

CREATE (adminSession:Session {
  sid: 'admin'
})
CREATE (admin)-[:OWNS]->(adminSession)
