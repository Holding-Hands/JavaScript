# grid布局(网格布局)

## 一、基本概念

### 1. grid布局作用

* **grid**布局将容器划分为行和列，产生单元格
* 指定 item 所在的单元格（二维布局）

### 2. grid布局基本概念

* 采用网格布局的元素成为容器，容器内部采用网格定位的直接子元素 称为**item**
  * 开启grid布局
  * display: grid；
  * display: inline-grid;
  * 作用与 flex、inline-flex一样
  * 设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。



## 二、容器（container）属性

###    1. gird-template-columns、grid-template-rows

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。

#### 1. gird-template-columns

* 定义每一列的宽

#### 2. grid-template-rows

* 定义每一行的行高

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

/** 除了使用绝对单位，也可以使用百分比。**/
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

#### 3. repeat()函数

1. 有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。上面的代码用repeat()改写如下。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

2. repeat()接受两个参数:

* 第一个参数是重复的次数（上例是3）
* 第二个参数是所要重复的值。

3. repeat()重复某种模式也是可以的。

   ```css
   grid-template-columns: repeat(2, 100px 20px 80px);
   
   上面代码定义了6列，第一列和第四列的宽度为100px，第二列和第五列为20px，第三列和第六列为80px。
   ```

#### 4. **auto-fill 关键字**

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

* auto 自动

* fill 填充

  ```css
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
  }
  
  表示每列宽度100px，然后自动填充，直到容器不能放置更多的列。(比flex智能点)
  ```

#### 5. **fr 关键字**

1. 为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

上面代码表示两个相同宽度的列。
```

2. `fr`可以与绝对长度的单位结合使用，这时会非常方便。

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}

上面代码表示，第一列的宽度为150像素，第二列的宽度是第三列的一半。
```



#### 6. **minmax()**

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);

我的理解：
1.
我们假设容器的宽度 900px
先算1fr 等于多少px 900px / 3fr = 300px  1fr = 300px
所以分三列 300px 300px 300px

2. 
我们假设容器宽度270px
先算 1fr 等于 多少 270px / 3fr = 90px 1fr = 90px
然后 90px 小于最小的100px 我们选100px
270px - 100px = 170px 我们重新计算1fr = 170px / 2fr= 85px
所以列的宽度
85px 85px 100px


带着这个猜想我去验证了下 果然没错 将width 改为270 和900 分别验证下 代码如下

<style>
        .grid {
            background: #aaaaaa;
            height: 600px;
            width: 270px;
            display: grid;
            grid-template-columns: 1fr 1fr minmax(100px, 1fr);
        }
        .grid-item {
            height: 100px;
        }
        .grid-item-1 {
            background: cadetblue;
        }
        .grid-item-2 {
            background: aquamarine;
        }

        .grid-item-3 {
            background: brown;
        }
    </style>

<div class="grid">
    <div class="grid-item grid-item-1">1</div>
    <div class="grid-item grid-item-2">2</div>
    <div class="grid-item grid-item-3">3</div>
</div>
```



#### 7. auto

* `auto`关键字表示由浏览器自己决定长度。

```css
grid-template-columns: 100px auto 100px;

上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度。
一般可以用于两头固定 中间自适应

grid-template-columns: 100px auto auto 100px;
也可以设置多个auto
```



#### 8. **网格线的名称**

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}

上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。网格布局允许同一根线有多个名字，比如[c1 r1]。
.container {
  display: grid;
  grid-template-columns: [c1 r1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```



#### 9. **布局实例**

`grid-template-columns`属性对于网页布局非常有用。两栏式布局只需要一行代码。

```css
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
上面代码将左边栏设为70%，右边栏设为30%。


传统的十二网格布局，写起来也很容易
grid-template-columns: repeat(12, 1fr);
```



### 2. grid-row-gap和grid-column-gap 

* gap: 开口; 豁口; 缺口

* `grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。
* 最新标准，属性名的grid-前缀已经删除，写为row-gap、  column-gap

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```

`grid-row-gap`用于设置行间距，`grid-column-gap`用于设置列间距。

### 3. grid-gap

* `grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

* 最新标准，属性名的grid-前缀已经删除，写为gap

```css
grid-gap: <grid-row-gap> <grid-column-gap>;

因此，上面一段 CSS 代码等同于下面的代码。
.container {
  grid-gap: 20px 20px;
}

如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。

.container {
  grid-gap: 20px
}
```



### 4. grid-template-areas 

* 网格布局允许指定**区域**（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

```css
1.
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}

上面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。多个单元格合并成一个区域的写法如下。


2.
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
上面代码将9个单元格分成a、b、c三个区域。


3.
下面是一个布局实例。
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";

上面代码中，顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar。

4.
如果某些区域不需要利用，则使用"点"（.）表示。
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

5.
注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。

比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end。
```



### 5. grid-auto-flow

* 主要用于排序方式

* 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。
* 默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
* 这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。
* 也可以将它设成`column`，变成"先列后行"。

```css
grid-auto-flow: column;
```

* `grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。	
* `row` 默认值 先行后列
* `column` 先列后行

* `row dense`，表示"先行后列"，并且尽可能紧密填满，尽量填满空格。 dense 密集的
* `column dense`, 表示"先列后行"，并且尽可能紧密填满，尽量填满空格。



### 6. justify-items ， align-items ， place-items 

* `justify-items`属性设置单元格内容的水平位置（左中右）。

* `align-items`属性设置单元格内容的垂直位置（上中下）。

* ```css
  .container {
    justify-items: start | end | center | stretch;
    align-items: start | end | center | stretch;
  }
  ```

* 这两个属性的写法完全相同，都可以取下面这些值。

  * start：对齐单元格的起始边缘。

  * end：对齐单元格的结束边缘。

  * center：单元格内部居中。

  * stretch：拉伸，占满单元格的整个宽度（默认值）。（参照flex里的）

  * ```css
    .container {
      justify-items: start;
    }
    ```

  * `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

  * ```css
    place-items: <align-items> <justify-items>;
    
    例如：place-items: start end;
    
    如果省略第二个值，则浏览器认为与第一个值相等。
    ```

### 7. justify-content， align-content， place-content

* `justify-content`属性是整个内容区域在容器里面的水平位置（左中右）。
* `align-content`属性是整个内容区域的垂直位置（上中下）。

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

* 这两个属性的写法完全相同，都可以取下面这些值。
* start - 对齐容器的起始边框。
* end - 对齐容器的结束边框。
* center - 容器内部居中。
* stretch - 项目大小没有指定时，拉伸占据整个网格容器。(默认值)
* space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
* space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
* space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

* `place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

* ```css
  place-content: <align-content> <justify-content>
  place-content: space-around space-evenly;
  如果省略第二个值，浏览器就会假定第二个值等于第一个值。
  ```



### 8. grid-auto-columns， grid-auto-rows

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目

* `grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。

* 它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高

* ```css
  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-auto-rows: 50px; 
  }
  
  指定新增的行高统一为50px（原始的行高为100px）
  划分好的网格是3行 x 3列，但是，8号项目指定在第4行，9号项目指定在第5行。
  ```

* 注意 行超出了 设置行才有用，列超出了设置列才有用

### 9. grid-template

`grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。

### 10. grid 属性

* `grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。
* 从易读易写的角度考虑，还是建议不要合并属性。



## 三、项目（item）属性

### 1. grid-column-start、grid-column-end、grid-row-start 、 grid-row-end 

* 项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

* ```css
  grid-column-start属性：左边框所在的垂直网格线
  grid-column-end属性：右边框所在的垂直网格线
  grid-row-start属性：上边框所在的水平网格线
  grid-row-end属性：下边框所在的水平网格线
  ```

* ```css
  .item-1 {
    grid-column-start: 2;
    grid-column-end: 4;
  }
  
  1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线
  上面代码 只指定了1号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线。
  除了1号项目以外，其他项目都没有指定位置，由浏览器自动布局，这时它们的位置由容器的grid-auto-flow属性决定，这个属性的默认值是row，因此会"先行后列"进行排列。大家可以把这个属性的值分别改成column、row dense和column dense，看看其他项目的位置发生了怎样的变化。
  ```

* ```css
  .item-1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  ```

* 这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

* ```css
  .container {
      grid-template-areas: "header header header"
                           "main main sidebar"
                           "footer footer footer";
      display: grid;
      grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4]
  }
  
  .item-1 {
    grid-column-start: header-start;
    grid-column-end: header-end;
  }
  
  左边框和右边框的位置，都指定为网格线的名字。 配合grid-template-areas 或者 grid-template-columns 来给网格命名一起来使用
  ```

* 这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

* ```css
  .item-1 {
    grid-column-start: span 2;
  }
  
  1号项目的左边框距离右边框跨越2个网格
  
  这与下面的代码效果完全一样。
  .item-1 {
    grid-column-end: span 2;
  }
  ```

* 使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。



### 2. grid-column  grid-row 

* `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式。

* `grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

* ```css
  .item {
    grid-column: <start-line> / <end-line>;
    grid-row: <start-line> / <end-line>;
  }
  ```

* ```css
  .item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
  /* 等同于 */
  .item-1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  
  上面代码中，项目item-1占据第一行，从第一根列线到第三根列线。
  
  这两个属性之中，也可以使用span关键字，表示跨越多少个网格。
  
  .item-1 {
    background: #b03532;
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  /* 等同于 */
  .item-1 {
    background: #b03532;
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }
  ```

* 斜杠以及后面的部分可以省略，默认跨越一个网格。

* ```css
  .item-1 {
    grid-column: 1;
    grid-row: 1;
  }
  ```

### 3. grid-area 

* `grid-area`属性指定项目放在哪一个区域。

* ```css
  .item-1 {
    grid-area: e;
  }
  指定1号项目位于e区域
  
  ```

* `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

* ```css
  .item {
    grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
  }
  
  .item-1 {
    grid-area: 1 / 1 / 3 / 3;
  }
  ```



### 4. justify-self、 align-self、place-self

* `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
* `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

* ```css
  .item {
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
  }
  ```

* start：对齐单元格的起始边缘。

* end：对齐单元格的结束边缘。

* center：单元格内部居中。

* stretch：拉伸，占满单元格的整个宽度（默认值）。

* ```css
  .item-1  {
    justify-self: start;
  }
  ```

* `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

* ```css
  place-self: <align-self> <justify-self>;
  place-self: center center;
  如果省略第二个值，place-self属性会认为这两个值相等。
  ```



## 四、相关资料引用

* http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html