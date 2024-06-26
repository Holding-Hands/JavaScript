## vue源码之mustache语法

### 1. 什么是模板引擎

 * 模板引擎是将`数据`变为`视图`的最优雅解决方案

 * 那么问题来了什么是数据呢？什么又是视图呢？

    * 数据就是 我们自己mock的数据或者ajax请求的，json格式，对象格式，数组，对象数组等

    * 视图就是我们 我们写好的代码(可以说是原生代码)

    * ```html
      <div>
          <div>姓名：张三</div>
          <div>性别：男</div>
          <div>年龄：18</div>
          <div>身高：180</div>
      </div>
      这就是我们的视图
      ```

   * 那什么是模板引擎呢？

   * ```vue
     在vue中，我们只需要执行一行代码就行 这个v-for 其实就是一种模板引擎
     <template v-for="item in arr">
     	<div>{{message}}</div>	
     </template>
     ```



### 2. 历史上的数据变为视图的方法

* 在我们没有`vue`之前，是如何将数据变为视图呢？

  1. 纯DOM法：非常笨拙，没有实战价值

     ```js
     <div class="parent"></div>	
     
     var data = [
         { name: '小明', age: 18, sex: '男' },
         { name: '小红', age: 18, sex: '女' },
         { name: '小李', age: 18, sex: '男' }
     ]
     
     var eParent = document.querySelector('.parent')
     for(var i = 0; i < data.length; i++) {
         // 每遍历一项 都要用dom方法去创建元素（标签）
         var eDiv = document.createElement('div')
         eDiv.innerText = arr[i].name
         
         // 创建的节点是孤儿节点， 所以必须要上树才能被用户看见
         eParent.appendChild(eDiv)
     }
     ```

     

  2. 数组join法：曾几何时非常流行，是曾经前端必会知识

     ```js
     我们知道 以前es5的时候str字符串是不能换行的
     var str = '123
     456
     789
     '
     像上面这样写是不对的，那么我们要渲染 结构化类似html那样的字符串该怎么办，这时候我们的主角登场了。数组的join法
     
     var str = [
         '<li>',
         '    <div>1</div>',
         '    <div>2</div>',
         '</li>'
     ].join('')
     便于我们阅读，其实转换后字符串也是没有换行的 只不过阅读性更强了有这种换行的感觉 能看清楚结构
     
     
     
     然后我们在遍历
     <div class="parent"></div>
     var data = [
         { name: '小明', age: 18, sex: '男' },
         { name: '小红', age: 18, sex: '女' },
         { name: '小李', age: 18, sex: '男' }
     ]
     var eParent = document.querySelector('.parent')
     for(var i = 0; i < data.length; i++) {
        eParent.innerHtml += [
         '<div>',
         '    <div>姓名：'+ data[i].name +'</div>',
         '    <div>年龄：'+ data[i].age +'</div>',
         '    <div>性别：'+ data[i].sex +'</div>',
         '</div>'	
     ].join('')
     }
     ```

     

  3. ES6反向引号法：ES6中的新增的\`${}\`语法糖，很好用

     ```js
     反引号字符串可以 换行（也是仅仅看着是换行 相当于数组join的优化版）
     
     <div class="parent"></div>
     var data = [
         { name: '小明', age: 18, sex: '男' },
         { name: '小红', age: 18, sex: '女' },
         { name: '小李', age: 18, sex: '男' }
     ]
     var eParent = document.querySelector('.parent')
     for(var i = 0; i < data.length; i++) {
        eParent.innerHtml += 
         `
     	<div>
             <div>姓名：${data[i].name} </div>
             <div>年龄：${data[i].age}</div>
             <div>性别：${data[i].sex }</div>
         </div>	
     	`
     }
     这种算是挺好用的 但是如果里面还有数组嵌套 这时候就不好搞了 所以模板引擎才是最好的
     
     字符串没有直接创建 dom渲染的快，因为字符串还有dom层级解析的过程
   ```
  
  4. 模板引擎：解决数据变为视图最优雅的方式

### 2. mustache相关

#### 2.1 了解mustache

* mustache：胡子的意思 因为他的嵌入标记 {{}} 非常像胡子

* [mustache官网](https://mustache.github.io/) [github](https://github.com/janl/mustache.js))

* `{{}}语法`也被Vue延用，这也是我们为什么学习mustache的原因

* mustache是最早的模板引擎库，比Vue诞生早多了，他的底层实现机理在当时是非常有创造性和轰动性的，为后续模板引擎发展提供了崭新的思路

* 首先我们需要 引入 mustache

  * 使用npm 安装 `npm install mustache --save`
  * 使用[cdn](https://www.bootcdn.cn/)方式引入 `<script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.2.0/mustache.js"></script>`
  * mustache既可以使用npm下载（node环境下载）又可以提供给浏览器环境使用，这种我们称为它是UMD（叫做通用模块定义规范（Universal Module Definition））

  

#### 2.2 mustache的基本使用

##### 2.2.1 mustache基本语法之循环

```js
	<div class="parent"></div>
    // import mustache  from './lib/mustache.js'
    import mustache from 'https://cdn.bootcdn.net/ajax/libs/mustache.js/4.2.0/mustache.js'
    注意点： {{#arr}}是与data中的arr对应的 可以随便起名字 data是个对象
    const data = {
        arr: [
            { name: '小明', age: 18, sex: '男' },
            { name: '小红', age: 18, sex: '女' },
            { name: '小李', age: 18, sex: '男' }
        ]
    }

    const templateStr = `
        {{#arr}}
            <div>
                <div>姓名：{{name}} </div>
                <div>年龄：{{age}}</div>
                <div>性别：{{sex}}</div>
            </div>
        {{/arr}}
`
    const domTree = mustache.render(templateStr, data)
    document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
```

##### 2.2.2 mustache基本语法之不循环

```js
非常简单像下面这样写就好了

import mustache  from '../lib/mustache.js'
    const data = {
        title: '这是标题',
        content: '这是内容'
    }

    const templateStr = `
        <h1>{{title}}</h1>
        <div>{{content}}</div>
`
    const domTree = mustache.render(templateStr, data)
    document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
```

##### 2.2.3 mustache基本语法之循环简单数组

```js
<script type="module">
    import mustache  from '../lib/mustache.js'
    const data = {
        citys: ['吉林', '江西', '山东']
    }

    const templateStr = `
        {{#citys}}
            <div>
                <div>{{.}}</div>
            </div>
        {{/citys}}
`
    const domTree = mustache.render(templateStr, data)
    document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
</script>

// {{.}} 这个就是数组的每一项 只能简单数组这样使用 对象数组不能这样使用
```

##### 2.2.4 mustache基本语法之循环嵌套数组

```js
<div class="parent">
</div>
<script type="module">
    import mustache  from '../lib/mustache.js'
    // import mustache from 'https://cdn.bootcdn.net/ajax/libs/mustache.js/4.2.0/mustache.js'
    const data = {
        info: [
            { name: '小明', age: 18, sex: '男', hobbies: ['游泳', '游戏'] },
            { name: '小红', age: 18, sex: '女', hobbies: ['跳棋', '象棋'] },
            { name: '小李', age: 18, sex: '男', hobbies: ['魔方', '魔术'] }
        ]
    }

    const templateStr = `
        {{#info}}
            <div>
                <div>姓名：{{name}} </div>
                <div>年龄：{{age}}</div>
                <div>性别：{{sex}}</div>
                <ul>爱好：
                {{#hobbies}}
                    <li>{{.}}</li>
                {{/hobbies}}
                </ul>
            </div>
        {{/info}}
`
    const domTree = mustache.render(templateStr, data)
    document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
</script>
```

##### 2.2.5 mustache语法之Boolean值

```js
<div class="parent">
</div>
<script type="module">
    import mustache  from '../lib/mustache.js'
    // import mustache from 'https://cdn.bootcdn.net/ajax/libs/mustache.js/4.2.0/mustache.js'
    const data = {
        info: [
            { name: '小明', age: 18, sex: '男', isShow: false },
            { name: '小红', age: 18, sex: '女', isShow: false },
            { name: '小李', age: 18, sex: '男', isShow: true }
        ]
    }

    const templateStr = `
        {{#info}}
            {{#isShow}}
                <div>
                    <div>姓名：{{name}} </div>
                    <div>年龄：{{age}}</div>
                    <div>性别：{{sex}}</div>
                </div>
            {{/isShow}}
        {{/info}}
`
    const domTree = mustache.render(templateStr, data)
    document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
</script>


// {{#isShow}} {{/isShow}} 布尔值决定内容是否显示
{{}} 里面 不能写表达式
```

##### 2.2.6 mustache的妙用

```js
模板字符串是最近今年刚出来的，那么之前是怎么写的呢？
首先我们了解这两个知识。 
1. type属性定义script元素包含或src引用的脚本语言。属性的值为MIME类型;
2. 支持的MIME类型包括text/javascript, text/ecmascript, application/javascript, 和application/ecmascript
3. 如果没有定义这个属性，脚本会被视作JavaScript。
4. 如果MIME类型不是JavaScript类型（上述支持的类型），则该元素所包含的内容会被当作数据块而不会被浏览器执行
5. 如果你自己任意定义type属性的值，则该元素所包含的内容也会被当作数据块而不会被浏览器执行

<script type="abcdefg"></script>
<script type="text/template"></script>

放到这里面的好处：
1. 标签有智能感应（颜色分明）有快捷键等
2. script 模板里的不会被当作js执行，不会显示在页面上，也不会执行的容器
<script type="text/template" id="template">
		{{#info}}
            {{#isShow}}
                <div>
                    <div>姓名：{{name}} </div>
                    <div>年龄：{{age}}</div>
                    <div>性别：{{sex}}</div>
                </div>
            {{/isShow}}
        {{/info}}    
</script>
          
const templateStr = document.querySelector('#template').innerHtml
const domTree = mustache.render(templateStr, data)
document.querySelector('.parent').innerHTML = mustache.render(templateStr, data)
          
          
 当然现在浏览器支持template标签和上面功能一样，都是不渲染的
 1.好处会有代码提示，更加方便
 <template id="template">
     {{#info}}
            {{#isShow}}
                <div>
                    <div>姓名：{{name}} </div>
                    <div>年龄：{{age}}</div>
                    <div>性别：{{sex}}</div>
                </div>
            {{/isShow}}
        {{/info}} 
 <template>
```



### 3. mustache的底层基本核心机理

##### 3.1 结论：mustache库不能用简单的正则表达式思路实现

* 在较为简单的示例请看我下，可以用正则表达式实现

```js
let templateStr = '<div>这是{{title}},这是{{content}}</div>'
const data = {
    title: '标题',
    content: '内容'
}

// findStr 代表匹配的字符串
// $1代表匹配的原子组也就是（）里的内容 如果有多个原子组那就$1,$2往后排
templateStr.replace(/\{\{(\w+)}\}/g, function(findStr, $1) {
    console.log(findStr, 'findStr')
    console.log($1, '$1')
    return data[$1]
})

// 封装成函数
// 最简单的模板引擎实现原理，利用正则表达式中replace()方法
// replace第二个参数可以是函数，这个函数提供捕获功能
// 结合data 替换 可以模拟最简单的模板引擎
function render(templateStr, data) {
    return templateStr.replace(/\{\{(\w+)}\}/g, function(findStr, $1) {
        return data[$1]
	})
}
render(templateStr, data)
```

* 当情况复杂的时候，正则表达式的思路肯定不行了，比如下面这种循环是不能用正则思路去实现的

```html
<div>
    <ul>
        {{#arr}}
        	<li>{{.}}</li>
        {{/arr}}
    </ul>
</div>
```

![mustache实现机理](https://s3.bmp.ovh/imgs/2021/09/e543c8b1f69cadcd.png)



##### 3.2 什么是tokens？

* tokens是一个`js嵌套数组`，说白了，就是`模板字符串的js表示形式`，他是抽象语法树，虚拟节点等等的开山鼻祖。

```js
let templateStr = '<div>这是{{title}},这是{{content}}</div>'
tokens = [
		["text", '<div>这是'], // 每一项都是token 数组 第0项代表类型
		["name",'title'],
		["text", ',这是'],
		["name", 'content'],
		["text", '</div>']
]
```

* 当模板字符串中有循环 存在时，它将被编译为嵌套更深的tokens

```js
let templateStr = `
	<div>
        <ul>
            {{#arr}}
                <li>{{.}}</li>
            {{/arr}}
        </ul>
	</div>
`
tokens = [
		["text", '<div><ul>'],
         ["#", 'arr': [
         	 ["text", '<li>'],
    		["name", '.'],
    		["text", '</li>'],
         ]]
		["text", '</ul></div>']
]
```



##### 3.3 mustache 底层重点要做的两件事

* 将模板字符串编译成tokens形式
* 将token结合数据，解析为dom字符串

### 4. 手写实现mustache库

##### 4.1 使用webpack和webpack-dev-server构建

* 模块化打包工具有webpack(webpack-dev-server)、rollup、Parcel等
* mustache官方使用rollup进行模块化打包，而我们今天使用webpack（webpack-dev-server）进行模块化打包，这是因为webpack（webpack-dev-server）能让我们`更方便的在浏览器`（而不是nodejs环境中）实时调试程序，相比nodejs控制台，`浏览器控制台更好用`,比如能够点击展开数组的每项，rollup开发时体验不如webpack（webpack-dev-server）热更新
* 生成库时UMD的，意味着它可以同时在nodejs环境中使用，也可以在浏览器环境中使用。实现UMD不难，只需要一个`通用头`即可

下图 webpack和webpack-dev-server

![webpack和webpack-dev-server构建](https://s3.bmp.ovh/imgs/2021/09/3b23b1eb5a9aa4de.png)
