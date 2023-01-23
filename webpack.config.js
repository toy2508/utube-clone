const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //js에서 css 파일을 분리해줌

const BASE_JS = "./src/client/js/";

//webpack 파일은 최신 javascript 문장을 쓸수없음
module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }), //css 파일을 분리해서 저장할 위치와 파일이름 설정
  ],
  output: {
    filename: "js/[name].js", // js 파일을 분리해서 저장할 위치와 파일이름 설정, [name] input 파일위치가 두개일때 해당 설정 필요
    path: path.resolve(__dirname, "assets"), // css, js 파일을 저장할 폴더 설정
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
