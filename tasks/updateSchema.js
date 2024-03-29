import fs from 'fs';
import path from 'path';
import Schema from '../app/data/schema';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
async () => {
  const result = await (graphql(Schema, introspectionQuery));

  if (result.errors) {
    console.error( // eslint-disable-line no-console
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../app/data/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
}();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../app/data/schema.graphql'),
  printSchema(Schema)
);
