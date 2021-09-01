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
```



### 3. mustache的底层基本核心机理

结论：mustache库不能用简单的正则表达式思路实现

### 4. 手写实现mustache库

