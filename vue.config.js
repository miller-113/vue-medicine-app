const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  filenameHashing: false,
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'all'
    ]
  }
})
