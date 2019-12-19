const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const TARGET_NODE = process.env.plat === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  lintOnSave: false,
  publicPath: '/dist/',
  configureWebpack: {
    entry: `./src/entry-${target}.js`,
    
    target: TARGET_NODE ? 'node' : 'web',
    devtool: 'source-map',
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' :  'var'
    },
    externals: TARGET_NODE ? nodeExternals({ // 所有节点模块将不再捆绑在一起，而是保留为require('module')。
      whitelist: /\.css$/ // 需要打包到捆绑包
    }) : {},
    optimization: { // 优化代码分包
      splitChunks: {
       chunks: "async", // 异步代码分包
       minChunks: Infinity, // 最少有几个模块公用才分包
      }
     },

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ]
  }
}