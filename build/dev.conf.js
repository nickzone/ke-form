var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        use: [{
          loader: "babel-loader"
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options:{
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: ('./example/index.html')
    })
  ]
}