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

