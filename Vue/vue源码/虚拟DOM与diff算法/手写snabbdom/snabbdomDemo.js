import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    // h,
} from "snabbdom";
import h from './h'

// 创建patch函数
const path = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
const vnode = h('a', {
    class: { 'aa': true },
    props: {
        href: 'https://github.com/Holding-Hands/JS',
        target: '_black'
    }},
    'qs'
)

// 让虚拟节点上树
const container = document.querySelector('#container')
// path(container, vnode)

const vDom = h('ul', {}, [
    h("li", {}, '牛奶'),
    h("li", {}, h("li", {}, '牛奶')),
    h("li", {}, [
        h("li", {}, '牛奶'),
        h("li", {}, '咖啡'),
        h("li", {}, '可乐')
    ])
])
console.log(vDom)
path(container, vDom)
