const path = require('path')
const jsonImporter = require('node-sass-json-importer')

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

  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          importer: jsonImporter(),
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
