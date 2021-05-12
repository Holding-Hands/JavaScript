## 1. css引入三种方式

* 内联样式（inline style 行内样式）

* 文档样式表（document style sheet）

* 外部样式表（external style sheet）

  * 当在外部引入css样式表 最后指定css编码加上以下代码即可

  * `@charset "utf-8";`

  * 引入方式

    * <style>
      	@import url(./css/common.css)
      </style>

    * <link rel="stylesheet" href="./css/common/css">

  * link相关

    * link元素除了可以用来引用css样式，还可以设置网页图标href的值是图标链接

      ```html
      <link rel="icon" href="./imgs/icon">
      ```

      

    * link元素的rel属性不能省略，用来指定文档与链接资源的关系

    * 一般rel若确定，相应的type也会默认确定，所以可以省略type

    * 网页图标支持的图片格式是`icon、png`，常用大小是`16*16`   `24*24`  `36*36`(单位像素)



## 2. 常用的css属性

 ### 2.1  color: 前景色(文字颜色)

```css
.box {
    color: orange;
    text-decoration: line-through;
    border: 1px solid;
}
color 会把 这条线颜色一起改变 所以说 设置color不仅仅是设置文字颜色，还会改变这个贯穿线颜色设置，而且当我们设置边框的时候，不设置颜色，color也会把边框颜色设置上，所以说color设置前景色，而不是仅仅设置文字颜色
```

![](https://i.bmp.ovh/imgs/2021/04/07bb29f3a5966a98.png)

### 2.2 font-size: 文字大小

```css
.box {
    font-size: 30px; /* px em rem % */
}
```

![](https://i.bmp.ovh/imgs/2021/04/6e4aba9a1fd9839b.png)



### 2.3 background-color: 背景颜色

```css
.box {
    background-color: orange;
}
```

![](https://i.bmp.ovh/imgs/2021/04/0307216c86eadf6f.png)



### 2.4 颜色的设置

```css
1. 基本颜色关键字（英文单词）
.box {
    background-color: cyan;
}


2. RGB颜色(颜色空间)
十进制：rgb(red, green, blue)
red: 0-255 取值
green: 0-255 取值
blue: 0-255 取值
1字节（byte） = 8个bit = 11111111（二进制）最大255

.box {
    background-color: rgb(0, 0, 0);
}

十六进制：#rrggbb #ffffff 每一种颜色取值范围00-ff 大小写都可以
十六进制的ff分解是255, 15*16 + 15*1 = 255
建议：尽量使用 #rgb 代替 #rrggbb 比如 #ff00ff 使用#f0f


3. RGBA颜色：rgba(red, green, blue, alpha) 
alpha：代表透明度，但是我看网上解释是阿尔法 取值范围0-1，取1是不透明，取0是全透明 
rgba(255, 255, 0, 0.5) 也可以这样写rgba(255, 255, 0, .5)

rgb值越大 越靠近白色，越浅，rgb值越小越靠近黑色，越深，rgb值一样一般是灰色

transparent关键字 代表rgba全都为0
background-color: rgba(0, 0, 0, 0)
background-color: transparent
```

### 2.5 文字属性

####  2.5.1 text-decoration

* 设置文本装饰线
* none：无任何装饰线
  * 可以去除a元素默认的下划线
* underline：下划线
* overline: 上划线
* line-through：贯穿线（中划线）

#### 2.5.2 letter-spacing

* letter：字母
* 设置字母的间距
* letter-spacing: 10px；
* 默认值：0
* 可以设置负数  letter-spacing: -1px  如果设置太大就会挤一块

#### 2.5.3 word-spacing

* word: 单词
* 设置单词之间的间距
* word-spacing: 10px；
* 同样也可以设置负数

#### 2.5.4 text-transform

* transform: 形变
* 用于设置文字的大小写转换
* none: 默认值 阻止所有字符的大小写被转换。
* capitalize: 将每个单词的首字母变为大写
* uppercase: 强制所有字符被转换为大写。
* lowercase： 强制所有字符被转换为小写

#### 2.5.5 text-indent

* indent: 缩格，缩进
* 用于设置第一行内容缩进
* text-indent: 2em； 缩进两个文字
* em相当于当前元素的文字大小（font-size）

#### 2.5.6 text-align

* 设置元素内容在元素中的水平对齐方式
* left：左对齐 默认值
* right: 右对齐
* center：居中
* justify：两端对齐 对最后一行没有效果。如果只有一行文本 就没有效果

### 2.6 字体属性

#### 2.6.1 font-size

* 文本的大小
* 具体数值 + 单位  100px 
* 是否继承：yes
* 谷歌中font-size最小为12px，也就是说，如果你设置字体大小，小于12那么浏览器显示的还是12

```css
.box {
    font-size: 20px;
    font-size: 50%; // 相当于父元素字体的一半
}
```

#### 2.6.2 font-family

* 设置文本字体名称

```css
.box {
    font-family: '宋体';
}
```

* 为了防止设置的字体刚好操作系统中（位置在c盘 / windows / fonts ）不存在

```css
.box {
    font-family: '宋体', Courier, monospace;
}
同时设置多个字体，一般我们设置字体都会设置多个字体

如果第一个字体存在 用第一个字体，如果第一个没有，往下找第二个字体，如果第二个字体没有，往下找第三个字体，依次类推，如果都没有，则用系统中的默认字体

如果在开发中，中英文使用不同的字体：
	建议将英文字体写到前面，中文字体写到后面	
	顺序 英文字体 中文字体
	原因：因为英文字体只适应英文，中文字体同时适应于英文和中文
```



#### 2.6.3 font-weight

* 设置文字的粗细
* 取值 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
* normal = 400
* bold = 700
* strong、b、h1 - h6等标签的font-weight默认就是bold

#### 2.6.4 font-style

* 设置文字常规、斜体显示
* normal：默认正常显示
* italic：用字体的斜体显示
  * em、i、cite、address、var、dfn等元素默认的font-style就是italic
  * font-family设置的字体支持斜体
* oblique：文本倾斜显示
  * 不管这个字体支不支持斜体，就是让他倾斜

#### 2.6.5 font-varient

* 可以影响小写字母的显示形式
* normal：默认值
* small-caps：将小写字母变为大写，但还是按照小写字母的规格显示

#### 2.6.6 line-height

* 设置文本的最小行高

* 行高可以先理解为一行文字所占据的高度

* 行高严格定义：两行文字基线baseline之间的间距（也等于文字的高度加上行距）

* ![](https://i.bmp.ovh/imgs/2021/04/04f7ee3b71c264e0.png)

* ![](https://i.bmp.ovh/imgs/2021/04/04f7ee3b71c264e0.png

* 基线（baseline）：与小写字母x最底部对齐的线

* 应用：假设div有一行字，让这行字垂直居中

  ```css
  .box {
      height: 100px;
      line-height: 100px;
  }
  ```

#### 	2.6.7 font 

* font 是一个缩写属性 可以写多个值

  ```css
  .box {
      font-size: 20px;
      font-family: '宋体';
      font-weight: bold;
      font-style: italic;
      font-varient: small-caps;
  }
  ```
```
  
* font: font-style font-varient font-weight font-size/line-heigt font-family;

  ```css
  .box {
      font: italic small-caps bold 20px/20px '宋体';
  }
```

* font: font-style font-varient font-weight font-size/line-heigt font-family 前三个可以任意调换顺序，也可以省略，line-height也可以省略



## 3. css其他选择器

#### 	3.1 属性选择器

```html
<div title='title-1'>111</div>
<div title='title-2'>222</div>
<div>333</div>
<div title='1-title-3'>444</div>
<div title='title-4'>555</div>

<style>
    /* 选择所有带有title属性的元素 */
    [title] {
        color: cyan;
    }
    
    /* 选择所有title属性的值为title-1的元素 */
    [title="title-1"] {
        color: cyan;
    }
    
    /* 选择所有title属性值包括1的元素 */
    [title*="1"] {
        color: cyan;
    }
    
    /* 选择所有title属性值以1开头的元素 参考正则表达式*/
    [title^="1"] {
        color: cyan;
    }
    
    /* 选择所有title属性值以1结尾的元素 参考正则表达式*/
    [title$="1"] {
        color: cyan;
    }
    
    /* title属性值恰好等于1 或是以1开头且后面紧跟'-'连字符的元素 例如类似下面这样*/
    /* 一般用于lang属性 */
    <div title="1- title">1</div>
    <div title="1-title">2</div>
    
    [title|="1"] {
        color: cyan;
    }
    
    /* 包括1 单词1与其他单词之间必须用空格隔开 */ 其实相当于类选择器了
    [title~="1"] {
        color: cyan;
    }
</style>


<style>
    我们可以写双引号
    [title="title-1"] {
         color: cyan;
     }
    
    我们也可以使用单引号
    [title='title-1'] {
     color: cyan;
    }
    
    我们也可以不使用引号 但是我么推荐使用双引号
    [title=title-1] {
     color: cyan;
    }
</style>
```



#### 3.2 后代选择器

```html
<style>
    /* 代表div里面的span 元素（包括直接子元素（儿子） 间接子元素（孙子，重孙子等） */
    div span {
        color: #f00;
    }
    
    /* 代表div里面的p元素 p元素里面有 span 元素 */
    div p span {
        color: #f00;
    }
</style>
```



#### 3.3 子代选择器

```html
<style>
    /* 代表div元素 里的 span 元素（直接子元素（儿子）*/
    div > span {
        color: #f00;
    }
    
    /* 代表div里面的p元素 p元素里面的 span 元素 */
    /* 这里提一笔 p元素里面不能嵌套块级元素 结构上会有问题 */
    div > p > span {
        color: #f00;
    }
</style>

<style>
    /* 第一种书写方式 个人更倾向于这种*/
    div > span {
        color: #f00;
    }
    
    /* 第二种书写方式 */
    div>span {
        color: #f00;
    }
</style>
上面的标签可以换成类或者id，其他选择器
```



#### 3.4 相邻兄弟选择器

```html
<style>
    /* 代表div元素 后 紧挨着span元素 （且div， span元素必须是兄弟元素）*/
    /* 选择的是span元素 */
    div + span {
        color: #f00;
    }
</style>
```



#### 3.5 全兄弟选择器

```html
<style>
    /* 代表div元素 后 所有的p元素 （且div， p元素必须是兄弟关系）*/
    div ~ p {
        color: #f00;
    }
</style>
```



#### 3.6 交集选择器

```html

<style>
    /* 同时满足两个条件 首先是div 元素 且类为box*/
    div.box {
        background: salmon;
	}
    
    /* 同时满足两个条件 首先是div 元素 且类为box 并且title属性值为title-1*/
    div.box[title="title-1"] {
        background: salmon;
	}
</style>
```



#### 3.5 并集选择器

```html
<style>
    /* 选择 所有div 元素 所有类名为box*/
    div, .box {
        background: salmon;
	}
</style>
```



#### 3.6 伪类选择器

* 动态伪类（dynamic pseudo-classes）

  * :link

    * a:link 未访问的链接

  * :visited

    * a:visited 已访问的链接

  * :hover

    * a:hover 鼠标挪到链接上
    * 注意：hover必须放在`link`和`visited`后面才能生效
    * 也可以应用其他元素 div:hover

  * :active

    * a:active 激活的链接 (鼠标在链接上长按住未松开)
    * 注意 active必须放在`hover`后面才生效
    * 顺序记忆：女朋友看到 买给她的 lv包后，哈哈大笑
    * 也可以应用其他元素 div:active

  * :focus

    * :focus指当前拥有输入的焦点的元素(能接收键盘输入)

    * ```
      input:focus {
      	background: #ff0;
      }
      文本输入框聚焦后，背景变颜色
      因为a元素可以被键盘的tab键选中聚焦，所以focus适用于元素
      ```

    * 动态伪类顺序 建议 :link  :visited :focus  :hover :active

    * 记忆：女朋友看到 买给她的 lv包后，疯了似的哈哈大笑

    * ```css
      取消a元素的tab选中
      需要在a元素的标签上写tabindex="-1"
      
      <a tabindex="-1">百度一下</a>
      ```

  * 注意：如果给a设置样式

  * ```css
    a {
        color: #f0f;
    }
    相当于a:link、a:visited、a:focus、a:hover、a:active都设置了 color: #f0f
    ```

* 目标伪类（target pseudo-classes）

  * :target (也是选中状态)

  * 用于锚点比较多

  * ```html
    <!DOCTYOE html>
    <html>
        <head>
            <style>
                /* 点击a标签后 相应的a标签 文字会变红 */
                :target {
                    color: #f00;
                }
            </style>
        </head>
        <body>
            <a href="#title1">title1</a>
        	<a href="#title2">title2</a>
        	<a href="#title3">title3</a>
            
            <div id="title1">
                title1
            </div>
            
            <div id="title2">
                title2
            </div>
            
            <div id="title3">
                title3
            </div>
        </body>
    </html>
    
    ```

* 语言伪类（language pseudo-classes）

  * :lang

* 元素状态伪类（UI element states pseudo-classes）

  * :enabled
  * :disabled
  * :checked

  ```html
  <style>
  	:disabled {
          color: #00f;
      }
  </style>
  ```

  

* 结构伪类（structural pseudo-classes）

  * nth: 第n个的意思

  * :nth-child()

    ```css
    :nth-child(1) {
        /*选择 所有的 第一个子元素*/
    }
    
    div:nth-child(1) {
        /*选择 所有的 第一个子元素，且是div元素的*/
    }
    
    n: 代表自然数0、1、2、3、4、5、6、7、8、9...
    :nth-child(n) {
        /*选择 所有的 子元素*/
    }
    
    div:nth-child(n) {
        /*选择 所有的 子元素 且是div元素*/
    }
    
    2n代表偶数
    :nth-child(2n) {
        /*选择 所有的 偶数的 子元素*/
    }
    
    div:nth-child(2n) {
        /*选择 所有的 偶数的 子元素 其实div*/
    }
    
    当然2n也可以使用even替换，even：偶数
    :nth-child(even) {
        /*选择 所有的 偶数的 子元素*/
    }
    
    div:nth-child(even) {
        /*选择 所有的 偶数的 子元素 其实div*/
    }
    
    有偶数必然有奇数，2n-1或者2n+1都代表奇数，只不过n的取值范围不同，这里我们不讨论
    当然也可以使用odd替换就不演示了，odd: 奇数
    :nth-child(2n-1) {
        /*选择 所有的 偶数的 子元素*/
    }
    
    div:nth-child(2n-1) {
        /*选择 所有的 偶数的 子元素 其实div*/
    }
    
    3n 代表第三个孩子
    取值范围 0, 3, 6, 9, 12, 15, 18, 21
    :nth-child(3n) {
        /*选择 所有的 偶数的 子元素*/
    }
    
    -n+5 取前五个
    取值范围 0、1、2、3、4、5 也就是取前五个
    
    
    当然上面那些只是常用的，大家也可以自己随意定义比如3n+1, 3n+2, 5n+1等等，这些都需要需要大家自己去发掘。
    3n+1 也可以3n + 1使用空格，跟随大家爱好去写
    ```

  * :nth-last-child()

    ```css
    :nth-last-child()与:nth-child()语法类似，不同的是:nth-last-child()从最后一个子元素开始往前计数
    :nth-last-child(3) {
        /* 选择倒数第三个元素 */
    }
    
    div:nth-last-child(3) {
        /* 选择倒数第三个元素 且该元素是div元素 */
    }
    
    :nth-last-child(2n+1) {
        /* 选择倒数奇数 如果这样写 其实和 :nth-child(2n+1)没什么区别 */
    }
    
    -n + 3 取值范围 3 2 1
    :nth-last-child(-n + 3) {
        /* 选择倒数第三个元素 也就是最后三个元素*/
    }
    ```

  * :nth-of-type()

    ```css
    匹配属于父元素的 特定类型 的第 N 个子元素.
    
    <div>
    	<div>1</div>
        <div>2</div>
        <p>3</p>
        <div>4</div>
        <div>5</div>	
    </div>
    
    div:nth-of-type(3) {
    	/* 选择的是div 元素 且 子元素的第三个div 此时选择的是 <div>4</div> */
    }
    
    div:nth-child(3) {
    	/* 选择的是div 元素 且 第三个子元素 因为第三个元素是p元素 不是div元素 此时无选择*/
    }
    
    :nth-of-type(2n) {
    	/* 所有类型都找 偶数元素 */
    }
    ```

    

  * :nth-last-of-type()

    ```css
    以上这四个参数都可以是数字，也可以是n 理解了nth-child就理解了这几个 都很简单
    <div>
    	<div>1</div>
        <div>2</div>
        <p>3</p>
        <div>4</div>
        <div>5</div>
    	<p>6</p>
    </div>
    
    div:nth-last-of-type(3) {
    	/* 选择的是div 元素 且 子元素的第三个div 此时选择的是 <div>2</div> */
    }
    
    div:nth-last-child(3) {
    	/* 选择的是div 元素 且 第三个子元素  <div>4</div>*/
    }
    ```

    

  * :first-child

    ```css
    等于nth-child(1)
    ```

    

  * :last-child

    ```css
    等于nth-last-child(1)
    ```

    

  * :first-of-type

    ```css
    等同于nth-of-type()
    ```

    

  * :last-of-type

    ```css
    等同于nth-last-of-type()
    ```

    

  * :root

    ```css
    根元素，就是html元素
    html {
        
    }
    
    :root {
        
    }
    两种写法一样的
    ```

    

  * :only-child

    ```css
    :only-child {
        /* 选择父元素中唯一的子元素 */
    }
    但我们忽略了一件事html也是唯一子元素 所以会整体都会生效
    
    div :only-child {
        /* 选择div下的 唯一的子元素 */
    }
    
    body :only-child {
        /* 选择body下的 唯一的子元素 */
    }
    ```

    

  * :only-of-type

    ```css
    
    body :only-type-of {
        /* 选择父元素种唯一的这种类型的子元素 */
    }
    ```

    

  * :empty

    ```css
    选择元素内容为空的元素
    :empty {
        height: 10px;
        background: #f0f;
    }
    /* 选择的是 <div></div> <p></p> 元素内容为空的元素*/
    <div>
    	<div>1</div>
        <div></div>
        <p></p>
        <div>4</div>
    	<p>6</p>
    </div>
    ```

    

* 否定伪类（negation pseudo-classes）

  * :not()

    ```css
    语法：:not(x)
    x代表是一个简单的选择器,元素选择器、通用选择器、属性选择器、类选择器、id选择器、伪类（除否定伪类）不支持交集并集选择器
    
    :not(div) {
        background: #f00;
        /* 选择所有除了div的元素 页面全部变红 因为有body*/
    }
    
    :not(html):not(body):not(div) {
        /* 选择所有除了div的元素,除了html，除了body元素 */
    }
    
    body :not(div) {
        /* 选择所有body元素下 除了div的元素的元素  */
    }
    
    body :not(.box) {
        /* 选择所有body元素下 除了类为.box的元素的元素  */
    }
    ```


### 4. 伪元素

##### 4.1.  :first-line 

* 一个冒号:或两个冒号都行

* :first-line 、::first-line

  ```css
  可以针对首行文本设置属性
  /* 设置p元素中 第一行文字的样式 */
  p:first-line {
      color: #FFF;
  }
  
  只能设置的属性：字体属性，颜色属性，背景属性，word-spacing、letter-sapcing、text-decoration、line-height、
  text-transform
  ```


##### 4.2. :first-letter

* :first-letter、::first-letter

  ```css
  /* 设置p元素中 第一个字的样式 */
  p:first-letter {
      font-size: 30px;
  }
  
  只能设置的属性：字体属性、margin属性、padding属性、border属性、颜色属性、背景属性
  ```


##### 4.3. :before

* :before、::before

  ```css
  用来在一个元素内容之前插入其他内容，可以是文字、图片
  span::before {
      content: '我是before的内容';
      margin-right: 10px;
  }
  
  span::before {
      content: url(图片地址); 
      margin-right: 10px;
  }
  /*
    在css属性值中使用url来引入图片，加不加引号都行
    url(图片地址)
    url('图片地址')
  */
  ```




##### 4.4. :after

* :after、::after

  ```css
  用来在一个元素内容之后插入其他内容，可以是文字、图片
  span::after {
      content: '我是after的内容';
      margin-right: 10px;
  }
  
  伪元素可以看成是行内元素，不支持设置宽高，如果想设置宽高，设置display: inline-block;
  ```




### 5. css特性

##### 5.1. 继承

* css中`有些`属性是可继承的。font-size、color等不用死记硬背

* 什么是继承？

  * 一个元素，如果没有设置某些属性的值，就会跟随`父元素`的值
  * 一个元素，如果有设置某些属性的值，就会使用自己设置的值

* 可以查mdn 看看那些属性具有继承https://developer.mozilla.org/zh-CN/

  * 我们一般搜索的时候要找到这种结构，才是对这个属性介绍，并不一定是搜索结果的第一项。 *…The* width *CSS property sets an element's* width*.…*（看不懂可忽略）
  * 未继承的属性比如width我们可以通过设置 width:100%；或者width：inherit；

* css属性继承的是计算值（computed value），并不是当初编写属性的指定值（字面值）

  ```css
  .parent {
      font-size: 60px;
  }
  
  .child {
      font-size: 0.5em; /* 继承的时候是，继承计算值0.5 * 60 = 30，而不是继承0.5em 你想grandson继承0.5em那就是相当于child 30px的一半 那就是15px 那就不对了 */
  }
  
  <div class="parent">
  	<div class="child">
  		<div class="grandson">123</div>
  	</div>
  </div>
  ```

  

##### 5.2. 层叠

* css允许多个相同名字的class属性层叠同一个元素上
* 层叠后的结果是：只有一个css属性会生效

* 后面的样式把前面的层叠掉，前提：使用了相同的选择器
* 当选择器不同，不能按照基本层叠来理解 就按照权重来层叠
* import! 10000
* 内联样式 1000
* id选择器权重：100
* class，属性，伪类选择器权重：10
* 元素，伪元素选择器权重：1
* 通配符 0
* 比较优先级的严谨方法
  * 从权重最大的开始比较每一种权重的数量多少，数量多的则优先级高，即可结束比较
  * 如果数量相同，比较下一个较小的权重，以此类推



