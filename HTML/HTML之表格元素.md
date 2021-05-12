HTML之表格元素

## 1. table

* 表格

* tr (table row) 表格行

* td (table define/description) 表格描述 行中的单元格

  ```html
  
  <table>
      <tr>
          <td>表格内容1</td>
          <td>表格内容2</td>
          <td>表格内容3</td>
          <td>表格内容4</td>
      </tr>
      <tr>
          <td>表格内容1</td>
          <td>表格内容2</td>
          <td>表格内容3</td>
          <td>表格内容4</td>
      </tr>
      <tr>
          <td>表格内容1</td>
          <td>表格内容2</td>
          <td>表格内容3</td>
          <td>表格内容4</td>
      </tr>
      <tr>
          <td>表格内容1</td>
          <td>表格内容2</td>
          <td>表格内容3</td>
          <td>表格内容4</td>
      </tr>
  </table>
  
  我们可以看结构，我们是没有写tbody这个元素的，但是在控制台查看，浏览器会默认给我们添加一个tbody这个元素
  ```

  

## 2. table属性

* border  边框的宽度
  * 属性值的px可以省略，例如img的width可以直接设置300，不需要写300px
  * 给最外层的table增加边框，给每个小的单元格也就是td添加边框，边框的颜色
  * border: 1
  * 已废弃，不建议使用
* cellpadding 单元格内部的间距
  * cellpadding: 2
* cellspacing 单元格之间的间距
  * cellspacing: 3
* width 表格的宽度
* align 表格水平对齐方式（不是内容对齐方式）
  * left
  * center
  * right
  * 已废弃
* 上面那些属性了解即可，实际开发很少用
* **`border-collapse`**(重要，经常用)
  * collapse （边框合并）
    * 边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。
  * separate  （边框分开）
    * 默认值 边框会被分开（不会合并）。不会忽略 border-spacing 和 empty-cells 属性。





## 3. tr元素

* valign （vertical align 垂直）
  * 单元格垂直对齐方式
  * top 对内容进行上对齐
  * middle 对内容进行居中对齐（默认值）
  * bottom 对内容进行下对齐
  * baseline  与基线对齐
* align
  * 单元格水平对齐方式
  * left
  * center
  * right





## 4. td 元素

* valign
* align
* width 带动某一列宽度都会变
* height 带动某一行高度都会变
* rowspan 单元格可横跨的行数
* colspan 单元格可横跨的列数





## 5. table中的其他元素

* tbody
  * 表格的主体（内容）
* caption
  * 表格的标题
* thead
  * 表格的表头
  * 一般就是第一行就是表格头部
* th
  * 表格的表头单元格（代替td）
* tfoot （很少用）
  * 表格的页脚



```html
<table>
    <!--  表格标题  -->
    <caption>表格的标题title</caption>
    <!--  表格头部  -->
    <thead>
        <tr>
            <th>表头1</th>
            <th>表头2</th>
            <th>表头3</th>
            <th>表头4</th>
        </tr>
    </thead>
    <!--  表格主题（内容）  -->
    <tbody>
        <tr>
            <td>表格内容1</td>
            <td>表格内容2</td>
            <td>表格内容3</td>
            <td>表格内容4</td>
        </tr>
        <tr>
            <td>表格内容1</td>
            <td>表格内容2</td>
            <td>表格内容3</td>
            <td>表格内容4</td>
        </tr>
        <tr>
            <td>表格内容1</td>
            <td>表格内容2</td>
            <td>表格内容3</td>
            <td>表格内容4</td>
        </tr>
    </tbody>
    <!--  表格页脚 和表格主题内容看起来没什么区别，所以很少用  -->	
    <tfoot>
        <tr>
            <td>页脚1</td>
            <td>页脚2</td>
            <td>页脚3</td>
            <td>页脚4</td>
        </tr>
    </tfoot>
</table>
```



## 6. 单元格合并

* 合并要领

  * 合并方向，向右，向下
  * colspan: 跨列合并（col 是 column的缩写 列）
  * rowspan: 跨行合并
  * 合并之后删除合并的元素，好像那种古代攻城拔寨，攻下一个城池，占领这个地方就把人都杀了

* ```html
  <table>
      <tr>
          <td colspan="2" rowspan="2">单元格1</td>
          <!--        <td>单元格2</td>-->
          <td>单元格3</td>
      </tr>
      <tr>
  <!--        <td>单元格1</td>-->
  <!--        <td>单元格2</td>-->
          <td>单元格3</td>
      </tr>
      <tr>
          <td>单元格1</td>
          <td>单元格2</td>
          <td>单元格3</td>
      </tr>
  </table>
  ```



## 7. css属性

* border-spacing
* 用于设置单元格之间的水平，垂直间距
* border-spacing: 10px 3px; 
  * 第一个值是水平间距，第二个值是垂直间距
  * 如果设置一个值，水平与垂直间距一样
  * 相当于替代了，cellpadding 单元格内部的间距，cellspacing  单元格之间的间距