const webpack = require("webpack");
const path = require("path");

const defaultInclude = path.resolve(__dirname, "src");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude
      },
    ]
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};

