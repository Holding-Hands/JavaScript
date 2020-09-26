# Function相关

## 1. 函数的声明

```js
1.
function a () {
    console.log('我是一个具名函数')
}
a();
=> 我是一个函数



// 函数表达式
2. 
let z = function() {
     console.log('我是一个匿名函数')
}; // 当表达式的时候要加【;】


// 对象里面的方法=> 对象里面的函数叫方法
3.
let o = {
    name: null,
    setName: function(name) {
        this.name = name;
    },
    getName: function() {
        return this.name;
    }
};

# 上面可以简写
let o = {
    name: null,
    setName (name) {
        this.name = name;
    },
    getName () {
        return this.name;
    }
};

o.setName('zcy');
console.log(o.getName());

=> zcy
```



## 2. 全局函数

```js
1.
function a () {
    console.log(111);
}

a(); 
window.a(); // 他声明的时候会压入全局的window对象中
=> 111
=> 111

2.
// 我们在来看一个例子
// 我们使用函数表达式来声明函数 同样也会压入全局的window对象中
var b = function() {
    console.log(222)
}
b();
window.b();
=>222
=>222

3.
// 我们再来看一个例子
let b = function() {
    console.log(222)
}
b();
=> 222
window.b();
error => Uncaught TypeError: window.b is not a function【会报错】

// 所以当使用let，const去声明不会压入全局的window对象中
```



## 3. 函数提升

```js
1. // 使用函数表达式声明
var b = function() {
    console.log(222)
}
b();
=> 222 // 正常执行

2. // 那么把执行顺序互换呢 【没有函数提升】
b(); // 会报错 b is not a function
var b = function() {
    console.log(222)
}

3. // 使用具名函数声明
function a () {
    console.log(111);
}
a()
=> 111

4. // 使用具名函数声明 【有函数提升】
a(); 
=> 111
function a () {
    console.log(111);
}

```



## 4. 立即执行函数

```js
# 子执行函数有自己的作用域，外面不能调用除非特殊方法
# 防止你引入的其他插件和你的函数有命名冲突到时候就不知道是谁的调用谁的函数了
## 老代码一般是使用自执行函数来定义的 以后都会使用模块化来解决

1.
(function a () {
    console.log('我是自执行函数');
})();

=> 我是自执行函数 // 自执行函数有自己独立的作用域，其他的是访问不到的

a(); // a is not defined 不能在全局使用

2.
(function a (window) {
    function b() {
         console.log('b');
    }
    
    function c() {
         console.log('c');
    }
    window.zcy = { b, c: c() }; // 相当于 window.zcy = { b: b, c: c() };
})(window);
zcy.b(); // 在全局调用
zcy.c; // 在全局调用

3. 使用let，const块级作用域来定义私有函数
{
   function b() {
         console.log('b');
    }
    
    function c() {
         console.log('c');
    }
    window.zcy = { b, c }; // 如果没有 此行，外部是不能执行的
}

```



## 5. 形参与实参

```js
1.
function sum (a, b) {
    console.log(a); // 1
    console.log(b); // 2
    return a + b;
}
sum(1, 2);
// 此时的a, b就是形参
// 此时的sum(1, 2) 1,2 就是实参
# 一般形参与实参的个数需要一一对应的。

2. // 如果你使用sum(1,2,3,4) 传入多个参数那么我们只取我们用到的前两个 对应a = 1; b = 2;
function sum (a, b) {
    console.log(a); // 1
    console.log(b); // 2
    return a + b;
}
sum(1, 2, 3, 4);

3. // 如果你使用sum(1) 传入少于形参的参数个数，那么我们只取传入参数的值，没传入就是undefined 对应a = 1; b = undefined;
function sum (a, b) {
    console.log(a); // 1
    console.log(b); // undefined
    return a + b;
}
sum(1);
```

