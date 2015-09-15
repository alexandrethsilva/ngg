import express from 'express';
import graphQLHTTP from 'express-graphql';

import morgan from 'morgan';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import AnonymousStrategy from 'passport-anonymous';

import webpack from 'webpack';
import WebpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

import Schema from './app/data/schema';

import getUserByToken from './app/data/queries/user/getUserByToken';


// Passport Setup
passport.use(new AnonymousStrategy());
passport.use(new BearerStrategy(
  async (token, cb) => {
    try {
      cb(undefined, await getUserByToken(token));
    } catch (err) {
      cb(err);
    }
  }
));

const HOST = 'http://dev.engage.local';

const APP_PORT = 9090;
const GRAPHQL_PORT = 9091;
const GRAPHQL_CONSOLE_PORT = 9092;

const ROOT = express.static('app/public');
const GRAPHQL_CONSOLE_ROOT = express.static('console');

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.disable('x-powered-by');

graphQLServer.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

graphQLServer.use(
  passport.authenticate(
    ['bearer', 'anonymous'],
    { session: false }
  )
);

graphQLServer.use('/',graphQLHTTP(request =>({
  schema: Schema,
  pretty: true,
  rootValue: { user: request.user }
})));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on ${HOST}:${GRAPHQL_PORT}`
));

// Expose a GraphQL endpoint
// const graphQLServer = express();
// graphQLServer.use('/', graphQLHTTP({schema: Schema, pretty: true}));
// graphQLServer.listen(GRAPHQL_PORT, () => console.log(
//   `GraphQL Server is now running on ${HOST}:${GRAPHQL_PORT}`
// ));

// Expose a GraphQL console
const graphQLConsole = express();
graphQLConsole.disable('x-powered-by');
graphQLConsole.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);
graphQLConsole.use(GRAPHQL_CONSOLE_ROOT);
graphQLConsole.use('/graphiql', express.static('node_modules/graphiql'));
graphQLConsole.use('/graphql', graphQLHTTP(request => ({
  schema: Schema,
  pretty: true,
  rootValue: { user: request.user }
})));
graphQLConsole.listen(GRAPHQL_CONSOLE_PORT, () => console.log(
  `GraphQL Console is now running on ${HOST}:${GRAPHQL_CONSOLE_PORT}`
));

// Serve the Relay app
const appCompiler = webpack(WebpackConfig);
const app = new WebpackDevServer(appCompiler, {
  contentBase: '/app/public/',
  proxy: {
    '/graphql': `${HOST}:${GRAPHQL_PORT}`,
    '/console': 'http://localhost:' + GRAPHQL_CONSOLE_PORT
  },
  publicPath: '/scripts/',
  hot: true,
  quiet: false,
  noInfo: false,
  stats: { colors: true },
  historyApiFallback: true
});

// Serve static resources
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);
app.use('/', ROOT);
app.use('/user/:uuid', ROOT);
app.listen(APP_PORT, () => {
  console.log(`App is now running on ${HOST}:${APP_PORT}`);
});
