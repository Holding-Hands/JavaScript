Lodash方法实现原理，更好的自我理解，对学习js有帮助，其实github上都有，有兴趣的可以去github查看

## 1  _.chunk()

```js
将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

语法：
_.chunk(array, [size=1])

/**
 * @params { Array } array 需要处理的数组
 * @params { Number } [size=1] 每个数组区块的长度
 * @returns { Array } 返回一个包含拆分区块的新数组（相当于一个二维数组）。
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 *  // => [['a', 'b'], ['c', 'd']]
 *
 *  _.chunk(['a', 'b', 'c', 'd'], 3);
 *  // => [['a', 'b', 'c'], ['d']]
 */


js实现原理：
function chunk (array, size = 1) {
    let tempArr = [];
    // size为1 或者 数组长度小于size 则返回原数组
    if(array.length <= size || size === 1) {
        tempArr.push(...array);
        return tempArr;
    }
    while(array.length > size) {
        tempArr.push(array.splice(0,size));
    }
    if(array.lenght !==0 ) {
        tempArr.push(array)
    }
    return tempArr;
}

chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```



## 2  _.compact()

```js
创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”

语法：_.compact(array);
/**
 * @params { Array } array 待处理的数组
 * @params { Number } [size=1] 每个数组区块的长度
 * @returns { Array } 返回过滤掉假值的新数组。
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */


js原理
function compact(array) {
    return array.filter(item => item)
}
compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```



## 3 _.concat()

```js
_.concat(array, [values])创建一个新数组，将array与任何数组 或 值连接在一起。

语法：_.concat(array, [values]);
/**
 * @params { Array } array 被连接的数组
 * @params { Number | Array  } [values] 连接的值
 * @returns { Array } 返回连接后的新数组。
 * @example
 *
 * let array = [1];
 * let other = _.concat(array, 2, [3], [[4]]);
 
 * console.log(other);
 * // => [1, 2, 3, [4]]

 * console.log(array);
 * // => [1]
 */
                                    

js实现原理 js函数提供的concat方法，可以使用【...】展开运算符，实现方式有很多就不细说了
array.concat(2, [3], [[4]])
                                     
```



## 4   _.difference()

```js
创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。

语法：_.difference(array, [values]);
/**
 * @params { Array } array 要检查的数组
 * @params { Array } [values] (...Array) 排除的值
 * @returns { Array } 返回一个过滤值后的新数组。
 * @example
 *
 * _.difference([3, 2, 1], [4, 2]);
 * // => [3, 1]
 */

js实现原理：
function dif(array,values){
  return arr.filter(item => !arr2.includes(item);)
}
dif([3, 2, 1], [4, 2]); // 其实个人感觉跟取补集合差不多
```



## 5  _.drop()

```js
创建一个切片数组，去除array前面的n个元素。（n默认值为1。）

语法：_.drop(array, [n=1]);
/**
 * @params { Array } array 要查询的数组
 * @params { Number } [n=1]  要去除的元素个数
 * @returns { Array } 返回array剩余切片。。
 * @example
 *
 * _.drop([1, 2, 3]);
 * // => [2, 3]
 * _.drop([1, 2, 3], 2);
 * // => [3]
 * _.drop([1, 2, 3], 5);
 * // => []
 */
 

js实现原理
function drop(array, n = 1) {
    if(n < 0) {
        return array;
    }
    array.splice(0, n);
    return array;
}
```

