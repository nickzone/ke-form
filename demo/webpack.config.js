const path = require('path');
const webpack = require('webpack');
const TransformModulesPlugin = require('webpack-transform-modules-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'css-loader!sass-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  resolve: {
    symlinks: false,
    alias: {
      'ke-form': path.resolve(__dirname, '../lib')
    }
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/dist/'
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map',
  plugins: [
    new TransformModulesPlugin(),
    new htmlWebpackPlugin({
      title: 'kk-form-demo',
      inject: true,
      hash: true,
      filename: 'index.html',
      template: './index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}