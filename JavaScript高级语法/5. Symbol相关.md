# Symbol相关

## 1. 声明symbol

### 1.1 Symbol()声明

```js
`作用` // 把他当作一个【唯一】(永远不会重复)的字符串
1.
const z = Symbol();

console.log(z);
=> Symbol();

z.description // 没有括号
=> undefined // 提取Symbol的描述

typeof z
=> "symbol"

2.
// symbol里面可以加描述
const z = Symbol('z最帅');
console.log(z);
=> Symbol(z最帅);

z.description
=> "z最帅" // 提取Symbol的描述
Symbol.keyFor(z); // 这种声明方式不能通过keyFor()拿描述
=> undefined

3. Symbol不带描述比较
const c = Symbol();
const y = Symbol();
c === y;
=> false

4.Symbol带描述比较
const c = Symbol(1)
const d = Symbol(1)
c === d;
=> false
```



### 1.2 Symbol.for()声明

```js
// Symbol.for()与Symbol()声明不同，Symbol.for()声明的时候会去内存地址查询是否已经声明过，如果声明过直接拿过来用，不必在创建一块内存去存放
1.
const z = Symbol.for();
=> Symbol(undefined);

2.
const z = Symbol.for('z最帅');
=> Symbol(z最帅)

3. Symbol不带描述比较
const c = Symbol.for();
const y = Symbol.for();
c === y;
=> true

4. Symbol带相同描述比较
const d = Symbol.for(1);
const e = Symbol.for(1);
d === e;
=> true

5.Symbol带不同描述比较
const d = Symbol.for(1);
const e = Symbol.for(2);
d === e;
=> false

# 区别于Symbol()声明的可以采用 Symbol.keyFor() 来拿到描述
Symbol.keyFor(d) 
=> "1"

```



## 2. 遍历Symbol为属性的对象

```js

const symbol = Symbol('zzz');
const obj = {
    name: 'zcy',
    [symbol]: 18
}

1. // 只遍历普通属性  for...in遍历不了Symbol属性
  // 可以保护对象属性不让别人看见
for(const key in obj) {
    console.log(key); // name
}

2. // 只遍历Symbol属性
Object.getOwnPropertySymbols(obj);
=> [symbol()];
for(const key of Object.getOwnPropertySymbols(obj)) {
    console.log(key); // Symbol(zzz)
}

3. // 遍历所有属性
for(const key of Reflect.ownKeys(obj)) {
    console.log(key); // name Symbol(zzz) 
}

```

