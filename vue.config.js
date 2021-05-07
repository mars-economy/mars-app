module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/styles.scss";'
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          use: 'graphql-tag/loader'
        }
      ]
    }
  }
}
