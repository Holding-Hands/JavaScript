const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./index.js", // string | object | array
    output: {
        // publicPath虚拟打包路径 文件夹不会真正生成 而是在8080端口 虚拟生成
        publicPath: '/xuni', // string (default)
        // 打包出来的文件名 不会物理生成
        filename: "dist.js",
    },
    devtool: "source-map", // enum
    // 通过为浏览器调试工具提供极其详细的源映射的元信息来增强调试能力，但会牺牲构建速度。
    devServer: {
        static: path.join(__dirname, 'public'), // 静态资源文件夹 public/index.html
        compress: false, // 不压缩
        port: 8080, // 端口号
        open: true,
        hot: true, // js改变热更新 html里改变不会热更新
    }
}
