import express from 'express';
import graphQLHTTP from 'express-graphql';

import morgan from 'morgan';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import AnonymousStrategy from 'passport-anonymous';

import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';

import webpack from 'webpack';
import WebpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

import schema from './app/data/schema/index';
import createLoaders from './app/data/loaders/createLoaders';

import getUserByToken from './app/data/queries/user/getUserByToken';

const HOST = 'http://dev.engage.local';

const APP_PORT = 3000;
const GRAPHQL_PORT = 3001;

const ROOT = express.static('app/public');
const BS_STYLE_ROOT = express.static('tmp/bootstrap.css');
const BS_JS_ROOT = express.static('tmp/bootstrap.js');
const JQ_JS_ROOT = express.static('tmp/jquery.js');

// Passport Setup
passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const user = await getUserByToken(token);
      done(undefined, user);
    } catch (err) {
      done(err);
    }
  }
));
passport.use(new AnonymousStrategy());

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.disable('x-powered-by');
graphQLServer.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'development'));
graphQLServer.use(cookieParser());
graphQLServer.use(
  passport.authenticate(['bearer', 'anonymous'], { session: false })
);
graphQLServer.use(graphQLHTTP(request =>({
  schema,
  pretty: true,
  graphiql: process.env.NODE_ENV !== 'production',
  rootValue: {
    domain: request.hostname,
    user: request.user,
    loaders: createLoaders(),
  },
})));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on ${HOST}:${GRAPHQL_PORT}`
));

// Serve the Relay app
const appCompiler = webpack(WebpackConfig);
const app = new WebpackDevServer(appCompiler, {
  contentBase: '/app/public/',
  hot: true,
  publicPath: WebpackConfig.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: { colors: true },
  historyApiFallback: true
});

// Serve static resources
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use('/', ROOT);

app.use('/graphql', proxy(`${HOST}:${GRAPHQL_PORT}`, {
  preserveHostHdr: true,
  decorateRequest(req) {
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie).token;

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  },
}));

app.use('/css/bootstrap.css', BS_STYLE_ROOT);
app.use('/scripts/bootstrap.js', BS_JS_ROOT);
app.use('/scripts/jquery.js', JQ_JS_ROOT);
app.use('/user/:uuid', ROOT);
app.listen(APP_PORT, () => {
  console.log(`App is now running on ${HOST}:${APP_PORT}`);
});
