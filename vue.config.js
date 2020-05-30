const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          new webpack.DefinePlugin({
            API_PORT: "",
            FETCH_MODE: '"same-origin"',
            FETCH_CREDENTIALS: '"same-origin"'
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      return {
        plugins: [
          new webpack.DefinePlugin({
            API_PORT: '":8888"',
            FETCH_MODE: '"cors"',
            FETCH_CREDENTIALS: '"include"'
          })
        ]
      }
    }
  }
}
