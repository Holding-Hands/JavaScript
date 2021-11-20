## 	flex布局

# 一、flex container的属性



## 1. flex items

* 默认沿着主轴方向从 main start 到main end方向 依次排列

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png" alt="" title="">

## 2. justify-content

* 决定了flex item在main axis上的对齐方式

```css
justify-content: flex-start; // 默认值 与main start对齐
justify-content: flex-end; // 与main end对齐
justify-content: center; // 居中对齐
justify-content: space-between; // space空间的意思 flex item 靠main start 和main end两边 剩下的0或多个平均在中间显示
justify-content: space-around; // flex item 距离main start， main end两边的间隔 等于 flex item之间的间隔的一半
justify-content: space-evenly; // flex item均匀的间隔
```



## 3. flex-direction

* 决定了主轴的方向

```css
flex-direction: row; // 默认值row 水平方向从左到右
flex-direction: column; // 垂直方向从上到下
flex-direction: row-reverse; // 水平方向从右到左
flex-direction: column-reverse; // 垂直方向从下到上 
```



## 4. align-items

* 决定了flex items在cross axis上的对齐方式

```css
align-items: normal; // 默认值 在弹性布局在和stretch（拉紧）效果一样 
aligin-items: stretch; // 当flex items在cross axis方向的size为auto时，会自动拉伸至填充flexcontainer类似一柱擎天效果。其实就是不设置flex item的高度会引起这个效果
align-items: flex-start; // 与cross start对齐
align-items: flex-end; // 与cross end对齐
align-items: center; // cross中心点对齐
align-items: baseline; // 与基准线对齐
```



## 5. flex-wrap

* 决定了flex container是单行还是多行

```css
/* 默认情况下，所有的flex items都会在同一行显示 */
flex-wrap: no-wrap; /* 默认值no-wrap 单行 */
flex-wrap: wrap; /* 多行 */
flex-wrap: wrap-reverse; /* 多行 对比 wrap,cross start 与cross end相反 */
```



## 6. flex-flow

* flex-direction || flex-wrap的缩写

```css
可以省略，顺序任意
flex-flow: flex-end wrap;
```



## 7. align-content 

* 决定多行flex items在cross axis 上的对齐方式用法与justifiy-content类似

```css
align-content: stretch; // (默认值) 与align-items的stretch类似
align-content: flex-start; // 与cross start对齐
align-content: flex-end; // 与cross end对齐 相当于沿着cross axis轴 平移到cross start
align-content: center; // 居中对齐
align-content: space-between; // space空间的意思 flex item 靠cross start 和cross end两边 剩下的0或多个平均在中间显示
align-content: space-around; // flex item cross start， cross end两边的间隔 等于 flex item之间的间隔的一半
align-content: space-evenly; // flex item均匀的间隔
```



## 8. 开启flex布局

```css
1. display: flex; // 开启之后是块级元素
2. display: inline-flex; // 开启之后是行内元素
```



# 二、flex item的属性

## 1. order

* order 决定了 flex items 的排布顺序
* 默认值是 0 
* 可以设置任意整数（正整数、负整数、0），值越小就越排在前面



## 2. align-self

* 可以通过 **aligin-self** 覆盖 **flex container**设置的align-items属性
* auto(默认值) 遵循 **flex container**设置的align-items属性
* stretch、flex-start、flex-end、center、baseline、效果跟align-items一致，只不够是单独设置某一个item的排列方式



## 3. flex-grow

* grow 生长、成长的意思
* flex-grow决定了**flex items**如何扩展
* 可以设置任意非负数字（正小数、正整数、0），默认值是0
* 当flex container在main axis方向上有剩余size时后，flex-grow属性才会生效
* 如果所有flex items的flex-grow总和sum 超过 1，每个flex item扩展 size 为 **flex container ** 剩余的size / sum * flex-grow 其实就是平分暂几份
* 如果所有flex items的flex-grow总和sum 小于 1，每个flex item扩展 size 为  **flex container ** 剩余的size * flex-grow
* flex items 扩展后的最终size不能超过 max-width \ max-height



## 4. flex-shrink

* shrink 收缩的意思
* flex-shrink决定了flex items 如何收缩
* 可以设置任意非负数字（正小数、正整数、0），默认值是1
* 当flex items 在main axis方向上超过了flexcontainer的size， flex-shrink属性才会生效
* 如果所有flex items 的flex-shrink总和超过1，每个 flex item 收缩的size为 flex items超出flex container的 **(size / sum)* flex-shrink**
* 如果所有flex items 的flex-shrink总和小与1， 每个 flex item 收缩的size为 flex items超出flex container的size * flex-shrink会收缩不完
* flex items 收缩后的最终size 不能小于 min-width / min-height



## 5. flex-basis

* 设置flex items在main axis方向上的base size
* auto (默认值) 、具体的宽度数值 原来的宽度是多少就是多少
  * flex-basis: auto;
* 同时设置 width 和flex-basis flex-basis起作用
  * flex-basis: 200px;
  * width: 100px;
  * 最终flex-items宽度为200px
* 决定flex items最终size（大小）因素的优先级
  * max-width / max-height / min-width/ min-height
  * flex-basis
  * width / height
  * 内容撑起的宽度，高度



## 6. flex

* flex是一个缩写属性，flex-grow || flex-shrink || flex-basis的简写，flex属性可以指定1个，2个，或3个值
* 单值语法：值必须为以下其中一个：
  * 一个无单位数（number类型）会被当成**flex-grow**的值
  * 一个有效的宽度（width）值 带单位的例如px 会被当成**flex-basis**的值
  * 关键字none，auto或initial
* 双值语法：
  * 第一个值必须为无单位的值，并且第一个值会被当作**flex-grow**属性的值
  * 第二个值必须为以下之一：
    * 一个无单位数会被当作**flex-shrink**的值
    * 一个有效宽度值，带单位的，当作**flex-basis**的值
* 三值语法：
  * 第一个值必须是无单位的，当作**flex-grow**属性的值
  * 第二个值必须是无单位的，当作**flex-shrink**属性的值
  * 第三个之必须是有单位的有效值，当作**flex-basis**属性的值

