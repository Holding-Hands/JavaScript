# Emmet语法

### 1. Emmet语法使用前奏

* webstrom 左上角  file -> setting -> Editor -> Emmet ->Html 勾选Enalbe abbreviation preview 
* vscode 直接使用就行

### 2. 语法

####    1. 生成html5代码

* ! 
* html:5
  * webstrom创建html5页面就会自动生成代码，不太需要这个，vscode中还是比较常见的

####    2. 生成子代的元素

* 生成以下结构 div > div > p > span > strong

* ```emmet
  div>div>p>span>strong 
  按tab键，enter键 都可以，这样就生成了
  ```

####    3. 生成兄弟元素

* 生成结构 

  ```html
  <div></div>
  <p></p>
  <h1></h1>
  ```

* 语法：div+p+h1 

  * 要手打，尽量不要复制，如果复制删除最后一个字符重新写

####   4. 生成多个元素

* 生成结构

  ```html
  <div>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
  </div>
  ```

* 语法：div>p*5

####   5. 上一级^

* 生成结构1: 

* ```html
  <div>
      <p>
         <span></span>
      </p>
      <span></span>
      <a href="" alt=""></a>
  </div>
  ```

* 语法 div>p>span^span+a

* 生成结构2：

  ```html
  <div>
      <p>
          <span></span>
      </p>
  </div>
  <h1></h1>
  <strong></strong>
  ```

* 语法：div>p>span>^^+h1+strong
* 可以使用多个 `^`



#### 6. () 对元素进行分组

* 生成结构

  ```css
  <div>
      <p>
          <span></span>
      </p>
  </div>
  <h1></h1>
  <strong></strong>
  ```

* 语法：div>(p>span)+h1+strong



#### 7. 属性

* ##### id属性

  * 结构

    ```html
    <div id="main"></div>
    ```

  * 语法：div#main

    

* ##### class属性

  * 1. 结构1：

    ```html
    <div class="main"></div>
    ```

  * 语法：div.main

    

  * 2. 结构2：

    ```html
    <div class="box1 box2 box3"></div>
    ```

  * 语法：div.box1.box2.box3

    

  * 3. 结构3：混合使用

    ```html
    <div class="box" id="header"></div>
    ```

  * 语法：div.box#header

* ##### 普通属性

  * 结构：

    ```html
    <div title="1111"></div>
    ```

  * 语法：div[title="1111"]

#### 8. 生成元素的内容 {}

* 结构1：

  ```html
  <div>div里的内容</div>
  ```

* 语法：div{div里的内容}



* 结构2：

  ```html
     <div class="box1"></div>
     <div class="box2"></div>
     <div class="box3"></div>
     <div class="box4"></div>
     <div class="box5"></div>
  ```

* 语法：div.box$*5



* 结构3：

  ```html
   <div>
         <p>p标签内容1</p>
         <p>p标签内容2</p>
         <p>p标签内容3</p>
         <p>p标签内容4</p>
         <p>p标签内容5</p>
     </div>
  ```

* 语法：div>p{p标签内容$}*5



* 结构4：

  ```html
  <div>
      <div>div的内容001</div>
      <div>div的内容002</div>
      <div>div的内容003</div>
      <div>div的内容004</div>
      <div>div的内容005</div>
  </div>
  ```

* 语法：div>div{div的内容$$$}*5  使用多个$



#### 9. 隐式标签

* 结构1：

  ```html
  <div class="box"></div>
  ```

* 语法：

  * div.box
  * 隐式写法  `.box`



* 结构2：

  ```html
  <ul>
      <li class="item"></li>
      <li class="item"></li>
      <li class="item"></li>
      <li class="item"></li>
      <li class="item"></li>
  </ul>
  ```

* 语法:

  * ul>li.item*5
  * 隐式写法 ul>.item*5



#### 10. css中的Emmet语法

* width
  * width: 100px;
  * 语法：w100

* height

  * height: 100px;
  * 语法：h100

* margin

  * margin: 10px;
  * 语法：m10

* margin-right / margin-left / margin-top / margin-bottom

  * mr
  * ml
  * mt
  * mb
  * m10-8-8-10  上右下左
  * m10-8-10  上（左右）下

* padding-right / padding-left / padding-top / padding-bottom

  * pr
  * pl
  * pt
  * pb
  * p10-8-8-10 上右下左
  * p10-8-10  上（左右）下

* 混合使用：

  ```css
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  ```

  * 语法：w100+h100+m10+p10

* font-size: 20px;

  * fz20

    

* font-size: 1.5em; 

  * fz1.5 （小数相对于父元素字体大小）

    

* font-weight: 700;

  * fw700

    

* line-height: 48px;

  * lh48px `要加单位，否则是不带单位的`

    

* background-color: \#31fab3;

  * bgc#31fab3

    

* border: 1px #31fab3 solid;

  * bd1#31fab3s

    

* display: inline-block;

  * dib