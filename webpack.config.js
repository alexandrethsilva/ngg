import webpack from 'webpack';

export default {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/index'
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
          'babel?cacheDirectory&optional[]=runtime&stage=0&plugins=./build/babelRelayPlugin'
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: '/',
    pathInfo: true,
    publicPath: '/scripts/'
  }
};
