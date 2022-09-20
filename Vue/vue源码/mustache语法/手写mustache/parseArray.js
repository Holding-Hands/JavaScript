import renderTemplate from "./renderTemplate";
import lookUp from "./lookUp";
/**
 * 处理数组 结合renderTemplate实现
 * @param token {array} 是token不是tokens
 * @param data {object}
 * @example ['#', 'info', []]
 * @example 递归 调用的次数由 data决定 data 循环数组的长度 info的长度为3调用三次
 * const data = {
        info: [
            { name: '小明', age: 18, sex: '男', hobbies: ['游泳', '游戏'] },
            { name: '小红', age: 18, sex: '女', hobbies: ['跳棋', '象棋'] },
            { name: '小李', age: 18, sex: '男', hobbies: ['魔方', '魔术'] }
        ]
    }
 */
export default function parseArray (token, data) {
    // 取出数组的数据
    const tempData = lookUp(data, token[1])
    let resultStr = ''
    // 便利的是数据 数组中有几条数据 调用几次
    for (let i = 0; i < tempData.length; i++) {
        // 这里需要判断一下 name 为 '.' 我们给数据 添加 .属性
        const data = tempData[i]
        resultStr += renderTemplate(token[2], {
            ...tempData[i],
            '.': tempData[i]
        })
    }
    return resultStr
}
