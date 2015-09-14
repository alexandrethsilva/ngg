import path from 'path';

export default {
  devtool: '#source-map',
  entry: path.resolve(__dirname, 'app/scripts', 'app.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      }
    ]
  },
  output: {filename: 'app.js', path: '/'}
};
