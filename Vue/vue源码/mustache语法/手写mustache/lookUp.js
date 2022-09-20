/**
 * 背景：
 * 在js中 我没定义一个对象 obj  obj = { p:{ q:111 } }
 * 我们可以使用 obj.p.q 进行访问  但不可以使用 obj['p.q'] 进行访问 此函数为了解决以上问题的
 * @description 功能是可以在data中，寻找用连续点符号的keyName属性
 * @example lookUp(obj, 'p.q')
 * @param data {object}
 * @param keyName {string}
 */
export default function lookUp (data, keyName) {
    // 判断包含 '.' 但keyName 不能是'.'
    if (/[\.,\[,\]]/.test(keyName) && keyName !== '.') {
        const keyNameArr = keyName.replace(/[\.,\[]/g, '.').replace(']', '').split('.')
        // 临时变量
        let tempData = data
        keyNameArr.forEach((key => {
            tempData = tempData[key]
        }))
        return tempData
    }
    return data[keyName]
}
