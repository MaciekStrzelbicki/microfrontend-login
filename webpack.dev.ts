import dotenv from 'dotenv';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const DEFAULT_PORT = 3001;

module.exports = {
  cache: {
    type: 'memory',
  },
  target: 'web',
  context: __dirname,
  entry: './src/entry.tsx',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'dev-bundle.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      progress: true,
    },
    compress: false,
    port: DEFAULT_PORT,
    open: true,
    historyApiFallback: true,
    liveReload: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      base: '/',
      template: 'public/index.html',
    }),
  ],
};
