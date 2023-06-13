module.exports = {
  assetsDir: "static-vue",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api.php": {
        target: "http://elviralift.mym35.com/",
      },
    },
  },
};
