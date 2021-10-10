/**
 * 折叠tokens 将#和/ 间的tokens整合起来 作为数组第三项
 * 思路 #入栈， /出栈
 * @param tokens
 */
export default function nextTokens (tokens) {
    // 结果
    const nextTokens = []

    // 栈结构，存放tokens中的 "#"的项
    const sections = []

    // 收集器 默认指向  结果数组nextTokens 收集器可能指向下标为2的token数组
    // 收集器指向会变化 遇到#时候 收集器会指向token 下标为2的数组那项
    let collector = nextTokens

    tokens.forEach(token => {
        switch (token[0]) {
            case '#':
                // 1. 收集器放入token
                collector.push(token)
                // 2. 压栈(入栈)
                sections.push(token)
                // 3. 给token 添加下标为2的项
                token[2] = []
                // 4. 收集器 指向变为当前下标为2的数组
                collector = token[2]
                break;
            case '/':
                // 出栈
                sections.pop()
                // 改变收集器 改变为栈的队尾那项数组的下标为2的位置     如果栈为空 指向返回最终结果
                collector = sections.length ? sections[sections.length - 1][2] : nextTokens
                break;
            default:
                // 不用管 当前collector 是谁 可能是nextTokens 也有可能是某个token下标为2的数组
                // 期间遇到文字就push 收集器中
                collector.push(token)
        }
    })
    return nextTokens
}


// export default function nextTokens (tokens) {
//     const nextTokens = []
//     // 栈结构，存放小tokens，栈顶 tokens数组 当前操作的这个tokens小数组
//     const sections = []
//
//     tokens.forEach(token => {
//         switch (token[0]) {
//             case '#':
//                 // 压栈（入栈）
//                 sections.push(token)
//                 // 遇到 # 给当前项下标为2 创建一个数组 收集子元素
//                 token[2] = []
//                 break;
//             case '/':
//                 // 遇到 “/” 弹出 当前 栈的最后一项（数组的最后一项）
//                 nextTokens.push(sections.pop())
//                 break;
//             default:
//                 // 判断栈队列当前情况 如果当前栈为空 那么说明没遇到#直接push最终返回结果就行
//                 sections.length === 0 ? nextTokens.push(token) : sections[sections.length - 1][2].push(token)
//                 // if (sections.length === 0) {
//                 //     nextTokens.push(token)
//                 // } else {
//                 //     sections[sections.length - 1][2].push(token)
//                 // }
//         }
//     })
//     console.log(nextTokens)
//     return nextTokens
// }
