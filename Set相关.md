# Set

## 1. set与数组区别

```js

1. set不能重复
let set = new Set();
set.add(1).add(1); // 使用add方法添加元素
=> {1}

let set = new Set([1,2,3,4,5]);
let set = new Set([1,1,2,2,3,4,5]);
=> {1, 2, 3, 4, 5}

2. 数组可以重复
arr = [1,1,2,3,3];
```



## 2. set与对象区别

```js
const obj = {
    1: 'aaa',
    "1": 'bbb'
}
=> {"1": bbb} // 会把属性当成字符串，如果同名属性的话后者会覆盖前者

let set = new Set();
set.add(1).add("1"); // set是严格类型的检测，类型不同值相同可以存在
=> { 1, "1"}
```



## 3. 创建set

```js
1. let set = new Set(['a', 'b', 'c', 'd']) // 传入一个数组
=> {"a", "b", "c", "d"}

2.let set = new Set("abcd") // 传入一个字符串，会把字符串展开,变成一个数组，相当于 new Set([..."abcd"])
=> {"a", "b", "c", "d"}
```



## 4.  set元素的数量

```js
// 相当于length
let set = new Set([1, 2, 3, 4]);
set.size // 注意没有括号，size只是个属性不是方法
=> 4

set.values();
=> SetIterator {1, 2, 3, 4} // 也可以查看set元素个数，不推荐
```



## 5. set中是否包含某个元素

```js
# set是严格类型的检测
// 返回值为布尔值
let set = new Set([1, 2, 3, 4]);
set.has(1);
=> true

set.has("1");
=> false
```



## 6. 删除set中的元素

```js
// 返回值为布尔值
let set = new Set([1, 2, 3, 4]);
set.delete(1);
=> true // 表示删除成功

let set = new Set([1, 2, 3, 4]);
set.delete(6);
=> false // 表示删除失败
```



## 7. 清空set所有元素

```js
let set = new Set([1, 2, 3, 4]);
set.clear(); // 没有返回值，就是undefined
=> undefined
console.log(set);
=> Set(0) {}
```



## 8. set类型与数组转换

```js
let set = new Set([1, 2, 3, 4]);
typeof set
=> "object"

1. 使用Array.from()转换
const arr = Array.from(set);
arr => [1, 2, 3, 4]

2. 使用【...】展开运算符转换
const arr = [...set]
arr => [1, 2, 3, 4]


```



## 9. 利用set去重

```js
// 数组与set相互转换，完成更好的功能
let arr = [1, 1, 2, 2, 3, 3, 4, 4]
let set = new Set(arr);
arr = [...set]
=> [1, 2, 3, 4]
```



## 10.获取set值

```js
let set = new Set([1, 2, 3, 4]);
set.values();
set.keys(); // set没有属性名，只有值但也可以通过keys来获取
=> SetIterator {1, 2, 3, 4}

set.entries(); // 返回的是一个迭代对象 是keys和values的综合方法
SetIterator {1 => 1, 2 => 2, 3 => 3, 4 => 4} //键名和值是一样的

# 只要是对象类型就有这三个方法
比如 array类型, set类型, 但对象有自己的方法Object.keys()后续再说
```



## 11.遍历set

```js
let set = new Set([1, 2, 3, 4]);
set.forEach((item, index, arr) => {
    console.log(item);
    console.log(index);
    console.log(arr);
})
```



