## 虚拟DOM和diff算法

### 1.  snabbdom简介（虚拟dom和diff算法鼻祖）

* snabbdom 瑞典语 速度的意思
* [snabbdom](https://github.com/snabbdom/snabbdom)是著名的虚拟DOM库，是diff算法的鼻祖，Vue源码借鉴了snabbdom
* snabbdom 源码中使用 TypeScript编写的 git上 不提供编译好的javascript版本 我们使用`npm i -S snabbdom`下载才是编译好的js版本
* snabbdom 库是DOM库 当然不能在node.js环境运行所以我们需要搭建webpack和webpack-dev-server开发环境，好消息是不需要安装任何loader

### 2. snabbdom的h函数如何工作

#### 2-1.什么是虚拟DOM?

* 用javascript 对象描述 dom的层次结构。DOM中的一切属性都在虚拟DOM中有对应的属性

```html
真实DOM
<div class="box">
    <h1>我是标题</h1>
    <ul>
        <li>牛奶</li>
        <li>咖啡</li>
        <li>可乐</li>
    </ul>
</div>
```

```js
虚拟DOM
{
    "sel": "div", // 选择器 selector
    "data": {
        "class": { "box": true }
    },
    "children": [
        {
            "sel": "h3",
            "data": {},
            "text": '我是标题'
        },
        {
            "sel": "ul",
            "data": {},
            "children": [
                { "sel": "li", "data": {},"text": '牛奶' },
                { "sel": "li", "data": {},"text": '咖啡' },
                { "sel": "li", "data": {},"text": '可乐' }
            ]
        },
    ]
}
```

#### 2-2. 为什么会有虚拟DOM？

1. diff算法是发生在虚拟DOM上的
2. 新的虚拟DOM和旧的虚拟DOM进行diff（精细化比较），算出应该如何最小量更新，最后反映到真实的DOM上
3. DOM变为虚拟DOM属于模板编译原理范畴，这里不做研究

#### 2-3. 虚拟DOM如何被渲染产生的

* 渲染函数，h函数产生的 h函数	

* h函数用来产生虚拟节点（vnode）virtual(虚拟的) node

  ```js
  比如这样调用函数
  h('a', { props: { href: 'https://github.com/Holding-Hands/JS' }}, 'qs')
  
  将得到这样的虚拟节点
  { "sel": 'a', data: { props: { href: 'https://github.com/Holding-Hands/JS' } }, 'text': 'qs' }
  
  他表示真实的DOM节点
  <a href="https://github.com/Holding-Hands/JS">qs</a>
  
  ```

* 一个虚拟节点有哪些属性？

  ```tex
  {
  	children: undefined, // undefined没有子元素
  	data: {}, // props class id 等
  	elm: undefined, // 对应真正的dom节点，如果是undefined代表虚拟dom还没有上树
  	key: undefined, // 节点的 唯一标识
  	sel: 'div', // 选择器 selector
  	text: '内容'
  }
  ```

* h函数可以嵌套使用，从而得到虚拟DOM树

  ```js
  h('ul', {}, [
      h("li", {}, '牛奶'),	
      h("li", {}, '咖啡'),	
      h("li", {}, '可乐')
  ])
  
  
  将得到这样的虚拟树
  {
      children: [
          { children: undefined, data: {}, elm: undefined, key: undefined, sel: "li", text: "牛奶" },	
          { children: undefined, data: {}, elm: undefined, key: undefined, sel: "li", text: "咖啡" },
          { children: undefined, data: {}, elm: undefined, key: undefined, sel: "li", text: "可乐" }
      ],
      data: {},
      elm: undefined,
      key: undefined,
      sel: "ul",
      text: undefined,
  }
  ```

  



### 3. diff算法原理

diff算法可以进行精细化比对，实现最小量更新

##### 3-1.末尾添加一个元素

```js
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

path(vnode1, vnode2)

这时候会在末尾创建一个li不会销毁前面的元素，在重新创建元素
```



##### 3-2 头部添加一个元素(不绑定key)

```js
const vnode1 = h('ul', {}, [
    h('li', {}, '苹果'),
    h('li', {}, '香蕉'),
    h('li', {}, '牛奶'),
    h('li', {}, '鸭梨')
])

const vnode2 = h('ul', {}, [
    h('li', {}, '菠萝'),
    h('li', {}, '苹果'),
    h('li', {}, '香蕉'),
    h('li', {}, '牛奶'),
    h('li', {}, '鸭梨')
])

path(vnode1, vnode2)

这时候的操作时 在末尾添加一个li元素 然后把vnode1中的 第一个li元素里的内容(菠萝) 换成(苹果)，第二个li(香蕉)换成(苹果)依次类推
当然我们理想化 添加同样的元素 尽可能的利用元素 如果添加不同元素 就是先尽可能利用，利用不了在添加元素
```



##### 3-3 头部添加一个元素(绑定key)

```js
const vnode1 = h('ul', {}, [
    h('li', { key: 'A' }, '苹果'),
    h('li', { key: 'B' }, '香蕉'),
    h('li', { key: 'C' }, '牛奶'),
    h('li', { key: 'D' }, '鸭梨')
])

const vnode2 = h('ul', {}, [
    h('li', { key: 'E' }, '菠萝'),
    h('li', { key: 'A' }, '苹果'),
    h('li', { key: 'B' }, '香蕉'),
    h('li', { key: 'C' }, '牛奶'),
    h('li', { key: 'D' }, '鸭梨')
])

path(vnode1, vnode2)
这时候 插入一个 陌生的key：E 其他的vnode都一样 不变，新添加一个li元素就好了，实现最小量更新 
```

##### 3-4 总结

* **key是这个节点的唯一标识**，告诉diff算法，在更改前后他们是同一个DOM节点
* **只有是同一个虚拟节点，才进行精细化比较**，否则就暴力拆除旧的，插入新的。
  * 如何定义是同一个虚拟节点？
  * 选择器（ul, ol）相同且key相同
* 只进行同层比较（父元素和父元素，子元素和子元素比较），不会进行跨层比较。即使是同一片虚拟节点，但是跨层了，diff算法也不会比较，还是暴力拆除旧的，插入新的（比如在旧节点的基础上多了一层 父节点，就暴力拆除，新插入）
* diff算法并不是那么无微不至的，上面2，3操作虽然可能觉得影响效率，但在实际vue开发中，基本不会遇见，所以这是合理的优化机制

### 4. 虚拟DOM如何通过diff变为真正的DOM

### 5. 手写diff算法

