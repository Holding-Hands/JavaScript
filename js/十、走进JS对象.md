# 十、 走进JS对象



## 1. 属性的基本操作方法

```js
1.
let user = {
    name: 'sm'
};

①. // 使用【.】读取属性，一般推荐使用【.】语法
console.log(user.name);

②. // 使用【[]】读取属性,中括号里填字符的形式
console.log(user['name']);

2.
let user = {
    name: 'sm',
    "my-age": 18,
    1: 1,
    "a b": 'ab'
};
console.log(user.name); // 访问不到,报错
console.log(user['name']); // 这种特殊字符作为属性，只能用[]来访问

console.log(user.1); // 访问不到,报错
console.log(user['1']); // 这种数字作为属性，只能用[]来访问

console.log(user.a b); // 访问不到,报错
console.log(user['a b']); // 这种数字作为属性，只能用[]来访问

3.
for(let index in user) {
    // index是属性名
    console.log(user.index); // 这时候取得是user里的index属性
    console.log(user[index]); // 这时候把index当成变量，获取对象里变量的值
}

4. // 给对象添加属性

let user = {
    name: 'sm'
};
user.age = 18;
console.log(user); // 新增属性
user.show = function() {} // 新增属性，值为函数


5. // 删除对象属性

let user = {
    name: 'sm',
    age: 18
};
delete user.age // 返回true删除成功
delete user // 不能删除对象 只能删除属性 返回false
```



## 2.  对象的引用传址

```js
1.
let user1 = {}
let user2 = user1; // 是将user1的内存地址传给user2，并不是传值，此时user1和user2共用一个内存地址

// 所以 将其中一个改变，另一个也会改变
user1.age = 18;
console.log(user2.age); // 18


2.
let a = 1;
function run(n) {
    n++;
}
run(a); // 会改变a的值么
console.log(a); // 其实是不会的，基本类型是传值

3.
let obj = {};
function add(payload) {
   payload.name = 'xm'; 
}
add(obj); // 会改变a的值么
console.log(obj) // 其实是会的，引用类型是传址
```



## 3. 展开语法在对象中使用

```js
1. 对象合并
let obj = {
    name: 'zzz'
}

let user = {
    age: 18
}
let newObj = { ...obj, ...user }; // ...obj取得里面的结构
console.log(newObj);

2. 如果两个对象中有同名属性合并之后怎么算呢
let obj = {
    name: 'zzz',
    age: 26
}

let user = {
    age: 18
}
let newObj = { ...obj, ...user };
console.log(newObj); // {name: "zzz", age: 18}


3. // 如果我们调换顺序呢
let obj = {
    name: 'zzz',
    age: 26
}

let user = {
    age: 18
}
let newObj = { ...user, ...obj };
console.log(newObj); // {age: 26, name: "zzz"}

总结：因为一个对象中如果存在同名属性，那么后面的会覆盖掉前面属性，所以谁在后面显示谁的属性
```



## 4. 解构赋值新增特性

```js
如果是展开语法是对数组和对象的批量处理，那么解构语法就是对(元素)数组和对象的结构的分解和处理, 对结构进行分解

let user = {
    name: 'z',
    age: 18
}

1.  我们可以把name属性的值赋值给其他变量
let { name: a, age: b } = user; // 将name属性的值赋值给a变量，age属性的值赋值给b变量
console.log(a, b); // 'z' 18

2.  我们也可以把name属性的值赋值给name，age属性的值赋值给age属性
let { name: name, age: age } = user;
console.log(name, age); // 'z' 18

对象属性，和赋值是一样的，可以简写如下
let { name, age } = user;

3. 只要你是一个对象就可以对其进行解构
function run() {
    return {
        name: 'z',
        age: 18
    }
}
let { name, age } = run(); // 返回值是对象可以解构


4. 
function run({ name, age }) {
    console.log(name, age); // 'z' 18
}
run({ name: 'z', age: 18 });


5. 我们可以接收其中几个，不用接收全部，其实就是你用哪个接收哪个
let { name } = {
    name: 'z',
    age: 18
}
console.log(name); // 'z'
console.log(age); // undefined
我们只接收name属性，不接收age
```



## 5. 严格模式中解构的差异

```js
不使用严格模式的情况下
let user = {
    name: 'z',
    age: 18
}
1.
{ name, age } = user; // 我们不用var，let，const声明会报错
console.log(name, age);

2.我们使用()包起来
({ name: a, age: b } = user);
console.log(name, age); // 'z' 18 可以打印出来

3.我们试试使用严格模式呢
"use strict"
({ name: a, age: b } = user);
console.log(name, age); // 还是会报错

# 其实在写程序时,最好都用严格模式
```

