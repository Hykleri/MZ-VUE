module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.maizuo.com',
        pathRewrite: {
          // 路由重写
          '^/api': ''
        }
      }
    }
  }
}
