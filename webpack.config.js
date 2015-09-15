import path from 'path';
import webpack from 'webpack';

export default {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9090',
    'webpack/hot/only-dev-server',
    './app/scripts/app.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?cacheDirectory&optional[]=runtime&stage=0&plugins=./build/babelRelayPlugin'
        ]
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: '/'
  }
};
