const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  disableHostCheck: true,
  allowedHosts: 'all',
  devServer: {
    allowedHosts: [
      'all'
    ]
}
})
