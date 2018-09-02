import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const mode = (process.env.NODE_ENV === 'test' && 'development') || process.env.NODE_ENV || 'development';

const assetsPath = path.join(__dirname, 'public', 'assets');
const faviconPath = path.join(__dirname, 'favicon');
const imagesPath = path.join(__dirname, 'src', 'images');
const entryPath = path.join(__dirname, 'src', 'index.js');

module.exports = {
  mode,
  entry: [entryPath],
  output: {
    path: assetsPath,
    filename: 'main.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /(\.js)(\.scss)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([assetsPath]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      { from: faviconPath, to: path.join(assetsPath, 'favicon'), toType: 'dir' },
      { from: imagesPath, to: path.join(assetsPath, 'images'), toType: 'dir' },
    ]),
  ],
};
