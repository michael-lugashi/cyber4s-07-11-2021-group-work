const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = { 
  watch: true,
  mode: 'development',
  entry: './main/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
      template: './main/index.html',
      title: 'index',
      filename: 'index.html'
  }),
  new CleanWebpackPlugin()
],
};