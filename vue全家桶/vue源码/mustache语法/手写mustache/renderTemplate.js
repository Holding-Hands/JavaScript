import lookUp from "./lookUp";
import parseArray from "./parseArray";
/**
 * @description 使tokens数组变为dom字符串
 * @param tokens { array } 处理好的tokens
 * @param data { object } 数据
 */
export default function renderTemplate (tokens, data) {
    let resultStr = ''
    tokens.forEach(token => {
        switch (token[0]) {
            case 'text':
                // 如果是text 类型 直接拼接
                resultStr += token[1]
                break;
            case 'name':
                // 如果是name 类型 直接获取值 要用lookUp 函数 防止多层.嵌套
                resultStr += lookUp(data, token[1])
                break;
            default:
                // 处理 #
                resultStr += parseArray(token, data)
        }
    })
    return resultStr
}
