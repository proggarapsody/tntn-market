const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
const CopyPlugin = require("copy-webpack-plugin");

// const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);
const filename = (ext) => `[name].${ext}`;

const generateHtmlPlugins = (url) => {
  const files = fs.readdirSync(path.resolve(__dirname, url));
  return files.map((file) => {
    const parts = file.split(".");
    const name = parts[0];
    const ext = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${url}/${file}`),
    });
  });
};

const htmlPlugins = generateHtmlPlugins("./src/pages");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: `${filename("js")}`,
    assetModuleFilename: "assets/[name][ext][query]", // Все ассеты будут
    // складываться в dist/assets
    clean: true, // Очищение папки dist перед каждой компиляцией
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {},
        },
      },
      {
        test: /\.(?:ico|png|gif|jpg|jpeg|svg|webp)$/i,
        type: "asset/resource",
      },
      // {
      //   test: /\.png$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/images/[name][ext]',
      //   },
      // },
    ],
  },

  plugins: [
    // ...
    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/js/db.json",
          to: "./",
        },
      ],
    }),
  ].concat(htmlPlugins),
};
