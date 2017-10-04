const path = require(`path`);

const webpackConfig = {
  entry: path.join(__dirname, `index.js`),
  output: {
    path: path.join(__dirname, `build`),
    filename: `bundle.js`,
    pathinfo: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          presets: [`env`],
        },
      },
    ],
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    assets: true,
    assetsSort: `name`,
    timings: true,
  },
};

module.exports = webpackConfig;
