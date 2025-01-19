const { defineConfig } = require("@vue/cli-service");
// const path = require("path");

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
const name = "Chef Simon"; // Browser title

const port = 8888; // Port number

module.exports = defineConfig({
  /* By default, Vue CLI assumes your app is deployed at the root of a domain,
  for example, https://www.my-app.com/.
  If your app is deployed at a sub-path, you need to specify that sub-path using this option.
  For example, if your app is deployed at https://www.my-app.com/my-app/,
  set publicPath to /my-app/ */
  publicPath: "/",
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    port: port,
    proxy: {
      "/api": {
        target: "http://276cm3720ud5.vicp.fun",

        logLevel: "debug",
        changeOrigin: true,

        secure: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
  chainWebpack(config) {
    // Inject title into index.html
    config.plugin("html").tap((args) => {
      args[0].title = name;
      return args;
    });
  },
});
