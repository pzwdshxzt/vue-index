module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 80,
    https: false
    // proxy: {
      // '/': {
      //   target: 'http://127.0.0.1:9090/',
      //   // 是否跨域
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/': '/'
      //   }
      // }
    // }
  }
}
