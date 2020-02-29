const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const nodemonPlugin = require('nodemon-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, argv) => ({
  entry: {
    server: './src',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  optimization: {
    minimizer: [
      argv.mode === 'production' ? new uglifyJsPlugin() : false
   ].filter(Boolean)
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  // plugins: []
  plugins: [
    argv.mode === 'development' ? new nodemonPlugin({
      watch: path.resolve('./dist'),
      script: './dist/server.js'
    }) : false
 ].filter(Boolean)
})