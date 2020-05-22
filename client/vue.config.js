const path = require('path')

module.exports = {
  devServer: {
    port: 4200,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './node_modules/sass-rem/_rem.scss'),
        path.resolve(__dirname, './src/styles/utils/_variables.scss'),
        path.resolve(__dirname, './src/styles/utils/**/!(_variables).scss'),
      ],
    },
  },
}
