// const px2rem = require('postcss-px2rem');
// const postcss = px2rem({
//   remUnit: 16   // 基准大小 baseSize，需要和rem.js中相同
// })


const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const  CompressionWebpackPlugin = require("compression-webpack-plugin")
module.exports = {//输出文件路径
   productionSourceMap:false,//不生产map

   //npm run build 输出到哪个文件夹
  // outputDir: __dirname+ '/serve/public/',

  //基本路径 

  // 生产环境 /admin/css/----.css  开发环境  /css/----.css
  publicPath: process.env.NODE_ENV === 'production' 
  ? '/admin/' 
  : '/',
  // 区分开发该是上线
  devServer: {
    historyApiFallback: true,
    port:8080,
    proxy: {
      '/api': {
        target: 'http://118.89.177.170:3001',
        changeOrigin: true
      }
    } 
  },  
  configureWebpack: {
   
    plugins: [
      // 预渲染
      // new  PrerenderSPAPlugin({
      //   staticDir: path.join(__dirname, '../dist'), 
      //   // outputDir: path.join(__dirname, '../prerendered'),
      
      //   routes: ['/','/register'], 
      //   // renderer: new Renderer({
      //   // inject: {
      //   // foo: 'bar'
      //   // },
      //   // headless: false,
      //   // renderAfterDocumentEvent: "render-event",
      //   // // renderAfterElementExists: '.container', 
      //   // renderAfterTime: 5000 
      //   // })
      //   renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
      //     renderAfterTime: 5000
      //   })
      //   }),
      // gizp压缩
          new CompressionWebpackPlugin({
            filename: '[path].gzip[query]',   // 提示compression-webpack-plugin@2.0.0的话filename改为asset
            algorithm: 'gzip',
            test:productionGzipExtensions,
            threshold: 10240, //内容超过10KB进行压缩
            minRatio: 0.8
        }),
    ],
    // 把webpack的配置写在这里 会自动合并
    // 以下库使用cdn，不会被打包
    externals: {
        // 'ant-design-vue':"https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.11/dist/antd.min.js",
        // 'Vue':'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
        // 'vue-router':'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'
        // 'vue':'Vue',
        // 'vue-router':'VueRouter'
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
