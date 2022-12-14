"use strict";
const { accessSync, appendFileSync, readFileSync, writeFileSync } = require('fs')

const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue Admin Template"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

const data=  updateBuildVersion()
process.env.VUE_APP_VERSION =data.version
process.env.VUE_APP_BUILD_VERSION = data.buildVersion
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/admin",
  outputDir: path.resolve(__dirname, "../src/dist"),
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require("./mock/mock-server.js"),
    proxy: {
      "/open_admin": {
        // target: "http://127.0.0.1:8888",
        // target: "http://dev.bitkeep.top:8855", 
        //  target: "http://118.193.40.6:8855",//个人
         target: "http://118.193.40.6:8119",//个人
        
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  }
};

function updateBuildVersion() {
  function getUpdate(v, time = 10) {
    const r = {
      v: v % time,
      Base: Math.floor(v / time)
    }
    // console.log(r)
    return r
  }
  function increaseVersion(version, time = 10) {
    let [v1, v2, v3] = version.split('.')
    v3 = getUpdate(Number(v3) + 1, time)
    v2 = getUpdate(Number(v2) + v3.Base, time)
    v1 = getUpdate(Number(v1) + v2.Base, time)
    return String(`${v1.v}.${v2.v}.${v3.v}`)
  }
  const versionPath = path.resolve(__dirname, './package.json')
  // let isExisted = false
  accessSync(versionPath)
  const rData = JSON.parse(readFileSync(versionPath, 'utf-8'))
  rData.buildVersion = increaseVersion(rData.buildVersion || '0.0.0', 200)
  console.log('build:version', rData.buildVersion)
  console.log('version', rData.version)
  writeFileSync(versionPath, JSON.stringify(rData, null, '\t'), 'utf-8')

  return rData
}