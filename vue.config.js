const { defineConfig } = require('@vue/cli-service')

const isVercel = Boolean(process.env.VERCEL)
const publicPath = process.env.BASE_URL || (isVercel ? '/' : '/webauthn-viewer/')
const outputDir = process.env.BUILD_OUTPUT_DIR || (isVercel ? 'dist' : 'docs')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  outputDir,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
      }
    },
    plugins: [
      new (require('webpack')).ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ]
  }
})
