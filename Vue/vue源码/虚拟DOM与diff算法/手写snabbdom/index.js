// import h from './h'
// import './snabbdomDemo'

// export const vDom = h('ul', {}, [
//     h("li", {}, '牛奶'),
//     h("li", {}, h("li", {}, '牛奶')),
//     h("li", {}, [h("li", {}, '牛奶'),
//         h("li", {}, '咖啡'),
//         h("li", {}, '可乐')])
// ])

import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h
} from "snabbdom";

const vnode1 = h('ul', {}, [
    h('li', {}, '苹果'),
    h('li', {}, '香蕉'),
    h('li', {}, '牛奶'),
    h('li', {}, '鸭梨')
])

const vnode2 = h('ul', {}, [
    h('li', {}, '苹果'),
    h('li', {}, '香蕉'),
    h('li', {}, '牛奶'),
    h('li', {}, '鸭梨'),
    h('li', {}, '菠萝')
])
// 创建patch函数
const path = init([classModule, propsModule, styleModule, eventListenersModule])

const container = document.getElementById('container')
const btn = document.querySelector('.btn')
path(container, vnode1)

btn.onclick = function () {
    console.log(111)
    path(vnode1, vnode2)
}
