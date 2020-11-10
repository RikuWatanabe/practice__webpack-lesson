import path from 'path';  //Node.jsでもともと用意されているpathというモジュールを使うために呼び出している記述
import MiniCssExtractPlugin from 'mini-css-extract-plugin';  //webpackコマンド実行時にCSSファイルを吐き出すために使うパッケージを呼び出している記述

const nodeEnv = process.env.NODE_ENV || 'development';  //変数nodeEnvの定義。コマンド実行時のNODE_ENV=developmentで指定されたものが代入される。何も指定がない場合はdevelopmentが代入
const devMode = nodeEnv === 'development';  //変数devModeの定義です。nodeEnv === 'development'の結果（true/false）が代入

console.log('nodeEnv ==> ', nodeEnv);  //結果をコンソールに表示
console.log('devMode ==> ', devMode);  //結果をコンソールに表示

const src = path.resolve(__dirname, './src');  //変数srcに絶対パスを代入している。１行目で呼び出したpathモジュールのresolveメソッドを使っている。
const dist = path.resolve(__dirname, './public');

const config = {  //設定ファイルの処理を指定したオブジェクトを変数configに代入している。
  mode: nodeEnv,
  entry: {
    app: `${src}/js/app.js`  //ここで指定したファイルが吐き出されるファイルの基になる
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${dist}/`,
  },
  module: {  //「loader」ここにはオブジェクトが入る
    rules: [
      // {
      //   test: /\.(jsx?|vue)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { failOnError: false }
      // },
      {
        test: /\.js$/,            //対象となるファイルの拡張子が正規表現で指定
        exclude: /node_modules/,  //babel-loaderから除外したいフォルダの指定
        loader: 'babel-loader',   //使いたい「loader」の指定
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',  //css-loaderでJavaScript上で読み込むように処理
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',  //postcss-loaderで指定のブラウザで必要なベンダープレフィックスを付与
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    'IE >= 11',
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader', //sass-loaderでSassをCSSにコンパイル
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    open: 'Google Chrome',
    inline: true,
    hot: true,
    port: 8080,
    contentBase: dist  //contentBaseはルートディレクトリを指定
  },
}

export default config;  //webpacknの処理はオブジェクトで指定する。この記述により、変数configを外から使えるようにしている。
