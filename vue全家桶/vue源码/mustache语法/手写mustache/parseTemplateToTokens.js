import Scanner from "./scanner";
import nextTokens from "./nextTokens";

/**
 * 将模板字符串变为 tokens 数组
 * @param templateStr
 * @return {[]}
 */
export default function parseTemplateToTokens (templateStr) {
    // 实例化 扫描器 构造时候 提供一个参数 ，这个参数就是模板字符串
    // 也就是说 这个扫描器针对这个模板字符串来服务的
    const scanner = new Scanner(templateStr)

    const tokens = []
    // 当指针 没有到头继续扫描
    while (!scanner.eos()) {
        const text = scanner.scanUtil('{{')
        scanner.scan('{{')

        const name = scanner.scanUtil('}}')
        scanner.scan('}}')

        // 有值 不是空字符串
        if (text !== ''){
            // 标签中的空格不难去掉比如<div class=""></div> class前面的 空格不能去掉
            // @TODO 有兴趣在研究研究
            tokens.push(['text', text])
        }

        // 有值 不是空字符串
        if (name !== '') {
            if (/^#/.test(name)) {
                tokens.push(['#', name.slice(1)]) // 从下标为1的位置去存储 因为0位置是#
            } else if(/^\//.test(name)) {
                tokens.push(['/', name.slice(1)]) // 从下标为1的位置去存储 因为1位置是#
            } else {
                tokens.push(['name', name])
            }
        }
    }
    return nextTokens(tokens)
}
