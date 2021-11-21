import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    usedExports: true,
    concatenateModules: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 10,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react', '@babel/typescript'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              'babel-plugin-styled-components',
            ],
          },
        },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('sass-loader'),
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
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
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'styled-components': path.resolve(__dirname, './node_modules/styled-components')

    }
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',

  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: false,
  },
};
