module.exports = {
  entry: {
    'dust-helper-react':  './src/index.js'
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'DustHelperReact',
    libraryTarget: 'umd'
  },

  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      amd: 'react-dom/server',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        exclude: /node_modules/
      }
    ]
  }
};
