const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  base
  filenameHashing: false,
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'all'
    ]
  }
})
