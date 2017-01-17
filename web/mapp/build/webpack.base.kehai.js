const path = require('path');
const webpack = require('webpack');
var pkg = require("../package.json");
var publishVersion = pkg.pubverison;
/**
 * 全局路径配置
 */
const ROOT_PATH = path.resolve(__dirname, '..');
const APPS_PATH = path.resolve(ROOT_PATH, 'apps');
const BUILD_PATH = path.resolve(ROOT_PATH, '..', 'public', 'mappdist');
const CSS_PATH = path.resolve(ROOT_PATH, 'css');
const TMPL_PATH = path.join('./template');
const LIB_PATH = path.join('./lib');
const MODULE= path.join('./module');

let isDebug = (process.env.NODE_ENV === 'development');
console.log('isDebug:', isDebug);

// publicPath,和页面引用保持一致
var publicPath = isDebug ? 'http://127.0.0.1:3000/web/ranstyle/web/public/mappdist/' : '/web/public/mappdist/';

var entry = {
    index:path.resolve(APPS_PATH, 'index.js'),
    // 公用模块
    vendors: [
        path.resolve(CSS_PATH, 'core.css'),
        path.resolve(MODULE, 'share.js')
    ]
};
/**
 * 资源别名
 */
var alias = {
    'css': path.join(ROOT_PATH, 'css'),
    'lib': path.join(ROOT_PATH, 'lib'),
    'module': path.join(ROOT_PATH, 'module'),
    'apps': path.join(ROOT_PATH, 'apps'),
    // 'less': path.join(APP_PATH, 'less'),
    // 'widgets': path.join(APP_PATH, 'widgets'),
    // 'vendors': path.join(APP_PATH, 'vendors'),
    // 'helper': path.join(APP_PATH, 'helper'),
     'data': path.join(APPS_PATH, 'data'),
    'mock': path.join(APPS_PATH, 'mock'),
    // 公用库提取
    // 'jquery': 'lib/jquery-1.12.4.min.js'
    // 'bootstrap': 'vendors/bootstrap.min',
    // 'template': 'vendors/template'
};

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// var ManifestPlugin = require('webpack-manifest-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssFile = isDebug ? 'css/[name].css' : 'css/[name].[contenthash:8].css';  //css/[name].[contenthash:8].css'css/[name].css?v=[contenthash:8]‘
var HtmlResWebpackPlugin = require('html-res-webpack-plugin');

var uglifyJS = new UglifyJsPlugin({
    compress: {
        warnings: false
    },
    except: ['$super', '$', 'exports', 'require']
});

var plugins = [
    new CommonsChunkPlugin({
        name: 'vendors',
        filename: isDebug ? 'apps/vendors.js' : 'apps/vendors.[hash:8].js' //'app/site/vendors.js?v=[hash:8]'
    }),
    new WebpackMd5Hash(),
    new webpack.ProvidePlugin({
        '$': 'n-zepto'
    }),
    new HtmlResWebpackPlugin({
        template: path.join(TMPL_PATH, 'index.html'),
        filename: 'index.html',
        inject:"head",
        chunks:{
            'vendors':{
                attr: {
                    js: "charset=\"utf-8\""
                }
            },
            'index': {
                attr: {
                    js: "charset=\"utf-8\""
                }
            }
        }
    }),
    new ExtractTextPlugin(cssFile)
];
//
// if (!isDebug) {
//       plugins.push(uglifyJS);
// }


var externals = {
    ga: 'window.ga'
};

module.exports = {
    entry: entry,

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        color: true,
        port: 3000,
        host: '127.0.0.1',
        contentBase: './'
        // proxy: {
        //     '/mockapi/*': {
        //         // 将页面api用charles代理到mockapi
        //         // 然后自动匹配到：http://127.0.0.1:3001/mockapi/
        //         target: 'http://127.0.0.1:3001',
        //         secure: false
        //     }
        // }
    },

    output: {
        path: BUILD_PATH,
        filename: isDebug ? 'apps/[name].js' : 'apps/[name].[chunkhash:8].js' ,  // 'apps/[name].js?v=[chunkhash:8]'
        publicPath: publicPath,
        chunkFilename: isDebug ? 'apps/[name].chunk.js' : 'apps/[name].chunk.[hash:8]js' //'apps/[name].chunk.js?v=[chunkhash:8]'
    },

    externals: externals,

    alias: alias,

    plugins: plugins
};
