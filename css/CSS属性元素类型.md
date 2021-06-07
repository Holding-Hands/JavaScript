# css属性元素类型

## 一、划分一

根据元素的显示（能不能在同一行显示）类型，html主要分为2大类

### 1、行内级元素（inline-level elements）

* 特点：
  * 多个行内级元素可以在父元素的同一行显示
* 常见的行内元素
  * a、img、span、strong、code、iframe、label、input、canvas、video、audio

### 2、块级元素（block-level elements）

* 特点：
  * 独占父元素一行
* 常见的块级元素
  * div、 p、h1~h6、ul、ol、li、table、form、hr 等等





## 二、划分2

根据元素内容（是否浏览器会替换掉元素）类型，html元素可以分为2大类

### 1、替换元素（replaced elements）

* 正常元素是写什么显示什么
* 替换元素本身没有实际内容，浏览器根据元素的类型（input 的type）和属性（img 的src）来决定元素具体显示内容
* img、input、iframe、video、embed、canvas、audio、object

### 2、非替换元素（non-replaced elements）

* 元素本身有实际内容，浏览器会直接将其内容显示出来，而不需要根据元素类型和属性，判断到底显示什么内容	





![](https://i.bmp.ovh/imgs/2021/05/31df92e5d3f3929e.png)

总结：

* 块级元素都是非替换元素
* 有些元素既是行内级元素，又是替换元素，所以我们可以称为行内级替换元素
* 替换元素都是行内元素
* 我们为什么要做这样的分类呢，我们之前说行内元素不能设置宽高，其实这样说是不准确的，行内非替换元素是不可以设置宽高的，行内替换元素可以设置宽高的

