import vnode from './vnode'

/**
 * h函数 转为虚拟dom
 * 我们编写一个 低配版的 必须要传 三个参数 没有ts的重载功能
 * @param sel 选择器
 * @param data
 * @param c 可能是内容 也可能是 children
 * @example
 * h('div', {}, 'content')
 * h('div', {}, h('div', {}, '子div'))
 * h('div', {}, [h('div', {}, '子div1'), h('div', {}, '子div2')])
 */
export default function h (sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error('请传入三个参数');
    }
    // 检查 c 的类型
    if (typeof c === 'number' || typeof c === 'string') {
        return vnode(sel, data, undefined, c, undefined)
    }

    // 数组类型
    else if (Array.isArray(c)) {
        // 收集children
        const children = []
        c.forEach(item => {
            if (typeof c !== 'object' || c.hasOwnProperty('sel')) {
                throw new Error('传入数组项，某一项不是h函数');
            }
            children.push(item)
        })
        return vnode(sel, data, children, undefined, undefined)
    }

    // 对象类型 传入的c 参数 是唯一的children
    else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        return vnode(sel, data, c, undefined, undefined)
    }

    else {
        throw new Error('传入的第三个参数 类型不正确');
    }
}
