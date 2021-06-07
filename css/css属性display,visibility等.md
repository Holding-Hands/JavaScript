## 一、css属性之display

* 修改元素的显示类型，有4个常用值
* block
  * 让元素显示为块级元素
  * 浏览器默认给div、p等设置了display：block；
* inline
  * 让元素显示为行内元素
* none
  * 隐藏元素
  * **隐藏的元素不占空间与visibility不同**
* inline-block
  * 让元素同时具备行内级、块级元素的特征
    * 跟其他行内元素在同一行显示
    * 可以随意设置宽高
* display的以下取值，等同于某些HTML元素
* table
  * 相当于```<table></table>```标签
  *  块级元素
* inline-table
  * 相当于```<table></table>```标签
  *  行内级元素
* table-row
  * 相当于```<tr></tr>```标签
  * 块级元素
* table-row-group
  * 相当于```<tbody></tbody>```标签
  * 块级元素
* table-header-group
  * 相当于```<thead></thead>```标签
  * 块级元素
* table-fotter-group
  * 相当于```<tfoot></tfoot>```标签
  * 块级元素
* table-cell
  * 单元格
  * 相当于```<td></td>```,```<th></th>```
  * 标签块级元素
* table-caption
  * table-caption
  * 表格的标题
* list-item
  * 相当于```<li></li>```标签
  * 块级元素



## 二、css属性之visibility

* 能够控制元素的可见性，有两个常用值
* visible
  * 显示元素
* hidden
  * **隐藏元素 占据空间与display：none不同**
* display: none; 与 visibility: hidden的区别
  * visibility: hidden
    * 虽然元素看不见了，但元素依旧还留着，还会占着原来的位置
  * display: none
    * 元素看不见，不会占据位置



## 三、css属性之overflow

* overflow 用于控制内容溢出的行为
  * visible
    * 溢出的内容可见
    * 默认值
  * hidden
    * 溢出的内容直接裁剪
  * scroll
    * 溢出内容被裁减（隐藏），但可以通过滚动机制查看
    * 不管溢出还是不溢出都会显示滚动条区域，滚动条区域会占用宽度和高度
  * auto
    * 自动根据内容是溢出来决定是否提供滚动机制（当只有溢出的时候，才有滚动条）
* overflow-x
  * 设置x轴（水平方向--左到右）滚动机制
* overflow-y
  * 设置y轴 （垂直方向--上到下）滚动机制
* 建议使用overflow，因为overflow-x，overflow-y还没成为标准，浏览器可能不支持



## 四、元素之间的空格

哪些元素都会产生空格？

* 行内级元素（包括inline-block元素）空格是由于换行符产生的，多个换行符会产生一个空格

* 目前建议的解决办法：

  * 元素代码之间不要留空格，不要留换行（不推荐）代码太乱了

    ```html
    <span>111</span><span>222</span><span>333</span>
    ```

  * 注释掉空格或者换行（不推荐）

    ```html
    <span>111</span><!--
    --><span>222</span>
    ```

  * 设置父元素的font-size为0，然后在元素中重新设置自己需要的font-size(不推荐)

    ```html
    空格也是字符，也有大小设置为0就没有大小了，此方法在Safair不适用
    
    .box {
    	font-size: 0;
    }
    span {
    	font-size: 16px;
    }
    
    <div class="box"></div>
        <span>111</span>
        <span>222</span>
        <span>333</span>
    </body>
    ```

  * 给元素加float



## 五、注意点元素之间的嵌套关系

* 一般情况下，块级元素，inline-block内联级元素，可以包含其他元素（比如块级元素、行内级元素、inline-block元素）
* 特殊情况
  * p元素里面不能包含其他块级元素，例如div，除了这个特殊的情况其他都可以
* 行内元素（span、strong、a）里面不要嵌套块级元素，一般情况下只包含行内元素





## 六、盒子模型

html中每一个元素都可以看作是一个盒子，如下图所示，都具备下列4个属性

![](https://i.bmp.ovh/imgs/2021/05/3b1d879055646aeb.png)



### 1. 内容相关属性

* width
  * 宽度
  * auto: 默认值
* min-width
  * 最小宽度，无论内容多少，宽度都大于等于min-width
* max-width
  * 最大宽度，无论内容多少，宽度都小于等于max-width
  * 最大宽度，小于等于最大宽度，如果父元素宽度500，子元素设置最大宽度为400，那么子元素宽度就是400，如果父元素宽度500，子元素设置最大宽度为600，那么子元素宽度就是500
* height
  * 高度
  * auto: 默认值
* min-height
  * 最小高度，无论内容多少，高度都大于等于min-height
  * 内容撑起的高度如果小于600那么高度就是600，内容撑起的高度如果大于600，那么以内容高度为准
* max-height
  * 最大高度，无论内容多少，高度都小于等于max-height
  * 假如最大高度200px，如果内容高度例如300px，高于最大高度，那么内容会超出显示，但最大高度还是200



* 注意：[`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width) 和 [`max-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width) 属性的优先级高于 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)。



### 2. 内边距相关属性

* padding-left: 左内边距
* padding-right: 右内边距
* padding-top: 上内边距
* padding-bottom: 下内边距
* padding
  - 当只指定**一个**值时，该值会统一应用到**全部四个边**的外边距上。
  - 指定**两个**值时，第一个值会应用于**上边和下边**的外边距，第二个值应用于**左边和右边**。
  - 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
  - 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的外边距。



### 3. 外边距相关属性

* margin-left: 左外边距
* margin-right: 右外边距
* margin-top: 上外边距
* margin-bottom: 下外边距
* margin
  - 当只指定**一个**值时，该值会统一应用到**全部四个边**的外边距上。
  - 指定**两个**值时，第一个值会应用于**上边和下边**的外边距，第二个值应用于**左边和右边**。
  - 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
  - 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的外边距。
* 注意：
  1. 两个盒子（竖着）第一个盒子设置margin-bottom为20px，第二个盒子设置为margin-top20px;  其实间距还是20px
  2. 





### 4. word-break

* word(单词) break(打断)
* normal
  * 使用默认的断行规则。
* break-all(这个用的多)
  * 对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
* keep-all
  * CJK 文本不断行。 Non-CJK 文本表现同 `normal`。
* break-word
  * 他的效果是`word-break: normal` 和 `overflow-wrap: anywhere` 的合，不论 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)的值是多少。

