const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // // Creates `style` nodes from JS strings
          "style-loader",
          // // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

    ]
  },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './index.html'
//     })
//   ],
  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
    },
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8080,
  },
};