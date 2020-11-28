const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      '@babel/polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/syntax-dynamic-import']
        },
        exclude: /node_modules/, 
      },
      {
        test: /\.(css|scss|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ]
  },
  node:{
    fs: "empty"
  },
  externals:{
    'BMap':'BMap',
  }
}
