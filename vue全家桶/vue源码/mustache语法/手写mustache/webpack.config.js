const path = require('path');

module.exports = {
    // webpack 5 不需要配mode
    mode: "development", // "production" | "development" | "none"
    entry: "./index.js", // string | object | array
    // webpack 开始打包
    output: {
        // webpack 如何输出结果的相关选项
        path:path.resolve(__dirname, "dist"), // string (default)
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        // filename: "[name].js",
        filename: "dist.js",
    },
    devtool: "source-map", // enum
    // 通过为浏览器调试工具提供极其详细的源映射的元信息来增强调试能力，
    // 但会牺牲构建速度。
    devServer: {
        contentBase: path.join(__dirname, "public"), // 静态文件根目录 html
        compress: false, // 不压缩
        port: 8000, // 端口号
        publicPath: '/xuni/', // 虚拟打包路径, dist.js没有真正形成
        hot: true, // js改变热更新 html里改变不会热更新
    }
}
