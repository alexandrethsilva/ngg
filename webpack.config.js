import path from 'path';
import {HotModuleReplacementPlugin, NoErrorsPlugin, ProvidePlugin} from 'webpack';

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/index',
  ],
  plugins: [
    new ProvidePlugin({
      'holder': 'holderjs',
    }),

    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?cacheDirectory&optional[]=runtime&stage=0&plugins=./build/babelRelayPlugin',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: '/',
    pathInfo: true,
    publicPath: '/scripts/',
  },
  resolve: {
    alias: {
      modules: path.join(__dirname, '/app/scripts/modules'),
      auth: path.join(__dirname, '/app/scripts/modules/auth'),
      common: path.join(__dirname, '/app/scripts/modules/common'),
      feed: path.join(__dirname, '/app/scripts/modules/feed'),
      user: path.join(__dirname, '/app/scripts/modules/user'),
      utils: path.join(__dirname, '/app/scripts/utils'),
    },
  },
};
