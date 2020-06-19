// const px2rem = require('postcss-px2rem');
// const postcss = px2rem({
//   remUnit: 16   // 基准大小 baseSize，需要和rem.js中相同
// })
module.exports = {//输出文件路径
   
  outputDir: __dirname+ '/serve/public/',
  //基本路径 
  publicPath: process.env.NODE_ENV === 'production' 
  ? '/admin/' 
  : '/',
  devServer: {
    port:8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
//   css: {
//     // // 启用 CSS modules
// 		// modules: false,
// 		// // 是否使用css分离插件
// 		// extract: true,
// 		// // 开启 CSS source maps?
// 		// sourceMap: false,
// 		// css预设器配置项
//     css: {
//       loaderOptions: {
//         postcss: {
//           plugins: [
//             postcss
//           ]
//         }
//       }
//     }
// }, 
  transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ],
// eslint 不检查
lintOnSave: false

}
  // //基本路径
  // publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // //输出文件路径
  // outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
