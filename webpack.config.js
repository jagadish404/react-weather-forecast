const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { resolve } = require('path');

module.exports = function (env) {
  const isProduction = env.production;
  const mode = isProduction ? 'production' : 'development';
  console.log('mode', mode);
  console.log('isProduction', isProduction);

  return {
    mode,
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'index.bundle.js',
      clean: true, // Cleans the output directory before rebuild
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      isProduction ? null : new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new Dotenv({ path: `.env.${mode}` }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      hot: true,
      port: 3000,
    },
  };
};
