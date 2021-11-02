## Vue2与Vue3响应式原理

#### 一、什么是响应式？

```js
// 1. 基本类型的响应式
const num = 1
console.log(num * 2) // 当num变化 自动执行console.log(num * 2)这行代码 这就是响应式 可以响应num的变化的
```



#### 二、响应式函数封装

* 在开发中 我们更多的是 对象的响应式

```js
// 创建一个 响应式函数数组
let reactiveFns = []

// 响应式函数
function watchFn (fn) {
    reactiveFns.push(fn)
}

const obj = {
    name: '李雷',
    age: 18
}

// 当obj.name变化的时候 自动执行 foo,和baz函数
function foo () {
    console.log(obj.name, 'foo')
}
watchFn(foo)

function baz () {
    console.log(obj.name, 'baz')
}
watchFn(baz)

// 这个函数和name没有关系 不需要响应式执行
function bar () {
    console.log('bar')
}

reactiveFns.forEach(fn => fn())
obj.name = '韩梅梅'

#缺点：每一个属性 都有一个数组，我们需要进行封装看下一步
```



#### 三、依赖收集类的封装

```js
class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = []
    }
    
    addDepend (fn) {
        this.reactiveFns.push(fn)
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
}

const depend = new Depend()
// 响应式函数
function watchFn (fn) {
    depend.addDepend(fn)
}

const obj = {
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
}

// 当obj.name变化的时候 自动执行 foo,和baz函数
function foo () {
    console.log(obj.name, 'foo')
}
watchFn(foo)

function baz () {
    console.log(obj.name, 'baz')
}
watchFn(baz)

// 这个函数和name没有关系 不需要响应式执行
function bar () {
    console.log('bar')
}

obj.name = '韩梅梅'
depend.notify() // 我们改变，对象属性，自己手动调用执行 下一步我们解决问题
```

#### 四、自动监听对象变化

```js
class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = []
    }
    
    addDepend (fn) {
        this.reactiveFns.push(fn)
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
}

const depend = new Depend()
// 响应式函数
function watchFn (fn) {
    depend.addDepend(fn)
}

const obj = {
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
}

// 监听对象变化vue3（proxy）
const proxy = new Proxy(obj, {
    set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        depend.notify() // 对象变化 自动执行
    },
    get (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    }
})

// 当obj.name变化的时候 自动执行 foo,和baz函数
function foo () {
    console.log(proxy.name, 'foo')
}
watchFn(foo)

function baz () {
    console.log(proxy.name, 'baz')
}
watchFn(baz)

// 这个函数和name没有关系 不需要响应式执行
function bar () {
    console.log('bar')
}

proxy.name = '韩梅梅'

#缺点：当我们改其他属性比如age 他也会执行name的响应式函数，没有对属性进行区分,应该每一个属性对应一个depend对象
```



#### 五、依赖收集的管理

```js
class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = []
    }
    
    addDepend (fn) {
        this.reactiveFns.push(fn)
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
}

const targetMap = new WeakMap()

// 获取depend的函数
function getDepend (target, key) {
    // 根据target 获取map
    let map = targetMap.get(target)
    // 第一次调用 可能没有值
    if(!map) {
        map = new Map()
        targetMap.set(target, map) 
    }
    
    // 根据key获取depend对象
    let depend = map.get(key)
    // 第一次调用没值，需要设置
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

const obj = {
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
}

const info = {
    name: '韩梅梅', // 一个属性对应一个dep对象
    age: 18
}

// 监听对象变化vue3（proxy）
const proxy = new Proxy(obj, {
    set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        getDepend(target, key).notify() // 对象变化 自动执行
    },
    get (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    }
})

// 当obj.name变化的时候 自动执行 foo,和baz函数
function foo () {
    console.log(proxy.name, 'foo')
}

function baz () {
    console.log(proxy.name, 'baz')
}

// age属性的响应式函数
// watchFn(() => {console.log(proxy.age, 1)})
// watchFn(() => {console.log(proxy.age, 2)})

// 这个函数和name没有关系 不需要响应式执行
function bar () {
    console.log('bar')
}

proxy.name = '韩梅梅'
```

![](https://i.bmp.ovh/imgs/2021/11/dfa758ef55897c9b.png)



#### 六、正确的收集依赖

* 对每一个对象和每一个对象中使用到的，属性进行响应式收集

```js
class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = []
    }
    
    addDepend (fn) {
        this.reactiveFns.push(fn)
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
}

const targetMap = new WeakMap()

// 获取depend的函数
function getDepend (target, key) {
    // 根据target 获取map
    let map = targetMap.get(target)
    // 第一次调用 可能没有值
    if(!map) {
        map = new Map()
        targetMap.set(target, map) 
    }
    
    // 根据key获取depend对象
    let depend = map.get(key)
    // 第一次调用没值，需要设置
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

// 当前执行的函数
let currentActiveFn = null

function watchFn (fn) {
    currentActiveFn = fn
    fn()
    currentActiveFn = null
}

const obj = {
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
}

const info = {
    name: '韩梅梅', // 一个属性对应一个dep对象
    age: 18
}

// 监听对象变化vue3（proxy）
const proxy = new Proxy(obj, {
    set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        getDepend(target, key).notify() // 对象变化 自动执行
    },
    get (target, key, receiver) {
        // 根据 target 和 key 获取 depend
        const depend = getDepend(target, key)
        
        // 向depend中添加响应函数
        depend.addDepend(currentActiveFn)
        return Reflect.get(target, key, receiver)
    }
})

// obj.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxy.age, 1)})
watchFn(() => {console.log(proxy.age, 2)})
```



#### 七、对depend类重构

* 优化 collectionDepend 方法
* 使用Set保存响应式函数
* 缺点：只能对obj做响应式收集

```js
// 当前执行的函数
let currentActiveFn = null

class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = new Set()
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
    
    // 收集依赖
    collectionDepend () {
        if(currentActiveFn){
            // 防止同一个函数 多次使用同一变量，会添加多个相同函数到 reactiveFns 改用set set没有重复的元素
            this.reactiveFns.add(currentActiveFn)
        }
    }
}

const targetMap = new WeakMap()

// 获取depend的函数
function getDepend (target, key) {
    // 根据target 获取map
    let map = targetMap.get(target)
    // 第一次调用 可能没有值
    if(!map) {
        map = new Map()
        targetMap.set(target, map) 
    }
    
    // 根据key获取depend对象
    let depend = map.get(key)
    // 第一次调用没值，需要设置
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

function watchFn (fn) {
    currentActiveFn = fn
    fn()
    currentActiveFn = null
}

const obj = {
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
}

const info = {
    name: '韩梅梅', // 一个属性对应一个dep对象
    age: 18
}

// 监听对象变化vue3（proxy）
const proxy = new Proxy(obj, {
    set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        getDepend(target, key).notify() // 对象变化 自动执行
    },
    get (target, key, receiver) {
        // 根据 target 和 key 获取 depend
        const depend = getDepend(target, key)
        depend.collectionDepend()
        return Reflect.get(target, key, receiver)
    }
})

// obj.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxy.age, 1)})
watchFn(() => {console.log(proxy.age, 2)})
```



#### 八、对象的响应式操作vue3

* 解决：只能对obj做响应式收集的缺点

```js
// 当前执行的函数
let currentActiveFn = null
const targetMap = new WeakMap()

class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = new Set()
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
    
    // 收集依赖
    collectionDepend () {
        if(currentActiveFn){
            // 防止同一个函数 多次使用同一变量，会添加多个相同函数到 reactiveFns 改用set set没有重复的元素
            this.reactiveFns.add(currentActiveFn)
        }
    }
}

function reactive (obj) {
    // 监听对象变化vue3（proxy）
    return new Proxy(obj, {
        set (target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            getDepend(target, key).notify() // 对象变化 自动执行
        },
        get (target, key, receiver) {
            // 根据 target 和 key 获取 depend
            const depend = getDepend(target, key)
            depend.collectionDepend()
            return Reflect.get(target, key, receiver)
        }
    })
}

// 获取depend的函数
function getDepend (target, key) {
    // 根据target 获取map
    let map = targetMap.get(target)
    // 第一次调用 可能没有值
    if(!map) {
        map = new Map()
        targetMap.set(target, map) 
    }
    
    // 根据key获取depend对象
    let depend = map.get(key)
    // 第一次调用没值，需要设置
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

function watchFn (fn) {
    currentActiveFn = fn
    fn()
    currentActiveFn = null
}

// 创建响应式对象
const proxyObj = reactive({
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
})

const proxyInfo = reactive({
    name: '韩梅梅', // 一个属性对应一个dep对象
    age: 18
})

// proxyObj.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxyObj.age, 1)})
watchFn(() => {console.log(proxyObj.age, 2)})

// proxyInfo.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxyInfo.age, 2)})
proxyInfo.age = 19
```



#### 九、对象的响应式操作vue2

* vue2与vue3区别是拦截的时候用的Object.defineProperty

```js
// 当前执行的函数
let currentActiveFn = null
const targetMap = new WeakMap()

class Depend {
    constructor () {
        // 创建一个 响应式函数数组
	   this.reactiveFns = new Set()
    }
    
    notify () {
        this.reactiveFns.forEach(fn => fn())
    }
    
    // 收集依赖
    collectionDepend () {
        if(currentActiveFn){
            // 防止同一个函数 多次使用同一变量，会添加多个相同函数到 reactiveFns 改用set set没有重复的元素
            this.reactiveFns.add(currentActiveFn)
        }
    }
}

function reactive (obj) {
    // 监听对象变化vue2（Object.defineProperty）
    Object.keys(obj).forEach(key => {
        let value = obj[key]
        Object.defineProperty(obj, key, {
            get () {
                const depend = getDepend(obj, key)
                depend.collectionDepend()
                return value
            },
            set (nVal) {
                value = nVal
                const depend = getDepend(obj, key)
                depend.notify()
            }
        })
    })
    return obj
}

// 获取depend的函数
function getDepend (target, key) {
    // 根据target 获取map
    let map = targetMap.get(target)
    // 第一次调用 可能没有值
    if(!map) {
        map = new Map()
        targetMap.set(target, map) 
    }
    
    // 根据key获取depend对象
    let depend = map.get(key)
    // 第一次调用没值，需要设置
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

function watchFn (fn) {
    currentActiveFn = fn
    fn()
    currentActiveFn = null
}

// 创建响应式对象
const proxyObj = reactive({
    name: '李雷', // 一个属性对应一个dep对象
    age: 18
})

const proxyInfo = reactive({
    name: '韩梅梅', // 一个属性对应一个dep对象
    age: 18
})

// proxyObj.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxyObj.age, 1)})
watchFn(() => {console.log(proxyObj.age, 2)})

// proxyInfo.age属性的响应式函数 自动执行 函数
watchFn(() => {console.log(proxyInfo.age, 2)})
proxyInfo.age = 19
```



#### 十、总结

```js
1. 简单封装

2. 依赖收集class封装
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

3. 自动监听对象变化
function watchFn () {} 

new Proxy(, set: depend.notify())

4. 依赖收集的数据结构 getDepend()
function getDepend() {}

5. 正确的收集依赖 每一个对象中，每一个属性对应一个depend
Proxy的get方法中收集对应的函数
全局activeReactiveFn变量
在get中找到depend对象, addDepend(全局activeReactiveFn变量)

6. 对Depend进行优化
addDepend函数换成depend函数
直接获取到自由变量
将之前保存的数组[]变成Set，防止收集的依赖函数，重复

7. 对对象的响应式操作
封装reactive函数
new Proxy(): Vue3
Object.defineProperty(): Vue2
```

