### HTML之表单元素

## 1. form 表单元素

* 一般情况下，其他表单元素都是他的**后代元素**

  ```html
  <form action="协议头://主机地址/路径"></form>
  ```
  
* action属性

  * 用于提交表单数据的请求url

* method属性

  *  默认get请求 method="get"   或者 method="GET"
    * get请求
      * 例如：?name=lan&age=18
      * 由于浏览器和服务器对URL长度有限制，因此在URL后面附带的参数是有限制的，通常不能超过1kb
        get请求 在请求url后面以?的形式跟上发给服务器的参数，多个参数之间用&隔开
    * post请求
      * 发送给服务器的参数，全部放在请求体中
      * 理论上，post传递的数据量没有限制（具体还给看服务器的处理能力）

* target属性

  * 在什么地方打开URL（参考a元素的target）
  * _self 默认当前页面
  * _blank

* accept-charset

  * charset 字符编码
  * 规定表单提交时使用的字符编码（默认值unkonwn，指的是和文档相同的编码 <meta charset="UTF-8">）

* enctype 编码类型

  * enc 是 encode简写(编码)
  * type 类型
  * 规定了在向服务器发送表单数据之前如何对数据进行编码
  * `application/x-www-form-urlencoded` 默认编码方式  允许将普通字符和特殊字符提交给服务器，文件不行
  * `multipart/form-data` 当表单包含 `type=file` 的 [`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) 元素时使用此值，并且method必须为post
  * text/plain 普通文本传输 出现于 HTML5，用于调试

## 2. input元素

* 单行文本输入框、单选框、复选框、按钮等元素
* 行内替换元素

###    一、input属性之type

* text: 文本输入框(明文输入) 默认值

* password: 文本输入框(密文输入)

* radio: 单选框

  ```html
  <span>性 别：</span>
  
  <span>男</span>
  <input type="radio" name="sex">
  
  <span>女</span>
  <input type="radio" name="sex">
  
  需要name一样，才能只选择一个，要不然都可以选
  ```

  ![image-20210507144947945](C:/Users/lenovo/AppData/Roaming/Typora/typora-user-images/image-20210507144947945.png)

* checkbox: 复选框

  ```html
  <span>爱 好：</span>
  
  <span>唱歌</span>
  <input type="checkbox" name="hobby">
  
  <span>跳舞</span>
  <input type="checkbox" name="hobby">
  
  <span>rap</span>
  <input type="checkbox" name="hobby">
  
  <span>篮球</span>
  <input type="checkbox" name="hobby">
  ```

  ![](https://i.bmp.ovh/imgs/2021/05/c0bb370ab114422b.png)

* button: 按钮

  ```html
  <div>
      <span>按钮：</span>
      <input type="button" value="按钮">
  </div>
  ```

  ![](https://i.bmp.ovh/imgs/2021/05/3c364ec8279a0684.png)

* reset: 重置

  * 当type值设置reset的时候，value值可以不写，会有默认显示文本

  * 所有的内容都必须在同一表单中

    ```html
    <form>
        <input type="reset">
    </form>
    ```

    ![](https://i.bmp.ovh/imgs/2021/05/ffb53bcb1253f2b4.png)

* submit: 提交表单数据给服务器

* file：文件上传

  ```html
  <div>
      <span>文件：</span>
      <input type="file">
  </div>
  ```

  ![](https://i.bmp.ovh/imgs/2021/05/5b1070e6e41f2c13.png)

### 二、input属性之maxlength

* 允许输入的最大字数
* 比如手机号限制11位

### 三、input属性之placeholder

* 占位文字

  ```html
  <div>
      <span>用户名：</span>
      <input type="text" placeholder="请输入用户名">
  </div>
  ```

  ![](https://i.bmp.ovh/imgs/2021/05/d583ed255f2329dc.png)

### 四、input属性之readonly

* 只读，不能输入（不常用）

  ```html
  <div>
      <span>用户名：</span>
      <input readonly type="text" placeholder="请输入用户名">
  </div>
  
  <div>
      <span>用户名：</span>
      <input readonly="readonly" type="text" placeholder="请输入用户名">
  </div>
  
  上述两种写法一样，都表示只读，和disabled还有点区别
  ```



### 五、input属性之disabled

* 禁用，不能输入

  ```html
  <div>
      <span>用户名：</span>
      <input disabled type="text" placeholder="请输入用户名">
  </div>
  
  会看到白色的禁用
  ```

![](https://i.bmp.ovh/imgs/2021/05/18bb311757384c42.png)



### 六、input属性之checked

* 默认被选中

* 只有当type类型的值位radio和checkbox时才可用

  ```html
  <div>
      <span>性 别：</span>
  
      <span>男</span>
      <input checked type="radio" name="sex">
  
      <span>女</span>
      <input type="radio" name="sex">
  </div>
  ```

  ![](https://i.bmp.ovh/imgs/2021/05/2243982203f2a042.png)



### 七、input属性之autofocus

* 当页面加载时 自动聚焦

* ```html
  <div>
      <span>密 码：</span>
      <input autofocus type="password">
  </div>
  
  <div>
      <span>姓 名：</span>
      <input autofocus type="text">
  </div>
  
  如果多个表单都写了 autofocus 默认聚焦第一个
  ```

* 

  ![](https://i.bmp.ovh/imgs/2021/05/ac0b582efa619673.png)



### 八、inout属性之name

* 在提交数据给服务器的时候，可用于区分数据类型

* 当我们提交的时候，表单会在?query后面自动加入name属性和值

* ```html
  <div>
      <span>手 机：</span>
      <input autofocus type="text" name="phone">
  </div>
  
  提交表单时后 
  ?phone=13245678901
  
  有name属性的表单 才能被提交 并作为key
  ```



### 九、input属性之value

* 取值（提交给服务器的值）

* 一般用下拉框中value 配合 name属性一起使用

* ```html
  <span>性别: </span>
  <label for="men">男</label>
  <input type="radio" name="sex" value="men" id="men">
  
  <label for="women">女</label>
  <input type="radio" name="sex" value="women" id="women">
  
  
  
  
  <label for="sing">唱歌</label>
  <input type="checkbox" name="hobby" id="sing" value="sing">
  
  <label for="dance">跳舞</label>
  <input type="checkbox" name="hobby" id="dance" value="dance">
  
  <label for="rap">rap</label>
  <input type="checkbox" name="hobby" id="rap" value="rap">
  
  <label for="basketball">篮球</label>
  <input type="checkbox" name="hobby" id="basketball" value="basketball">
  ```

### 十、input属性之form

* 根据某个表单提交（很少用）
* 设置所属的form元素（填写form元素的id）
* 一旦使用此属性，input元素即使不写在form元素内部，他的数据也能够提交到数据库



### 十一、布尔属性（boolean attributes）

* 常见的布尔属性

* disabled

* checked

  * 用在单选框，和多选框

* readonly

* multiple 

  * 多选

    ```html
    <select name="" id="" multiple>
        <!--  value是选择小学，高中之后对应的值，比如选择小学对应的值primary  -->
        <!--  而元素中的内容（小学），是给用户看的，让用户选择  -->
        <option selected value="primary">小学</option>
        <option value="middle">高中</option>
        <option value="university">大学</option>
    </select>
    
    按住ctrl 键多选
    ```

    ![](https://i.bmp.ovh/imgs/2021/05/1a0a06ff4aeb154f.png)

* autofocus 

* selected 

  * 用在下拉框中的option元素

  * ```html
    <select name="" id="">
        <!--  value是选择小学，高中之后对应的值，比如选择小学对应的值primary  -->
        <!--  而元素中的内容（小学），是给用户看的，让用户选择  -->
        <option selected value="primary">小学</option>
        <option value="middle">高中</option>
        <option value="university">大学</option>
    </select>
    
    默认选中小学
    ```

  * ![](https://i.bmp.ovh/imgs/2021/05/a8b600961eac5cfb.png)

### 	十二、input元素与label元素

* ```html
  <!--  for属性 是为谁服务的  -->
  <label for="name">姓名：</label> 
  
  <!--  id属性 为了for填写的 -->
  <input type="text" id="name">
  
  点击姓名 文本框自动聚焦（获取焦点）
  
  
  <span>性别: </span>
  <label for="men">男</label>
  <input type="radio" name="sex" id="men">
  
  <label for="women">女</label>
  <input type="radio" name="sex" id="women">
  
  点击 男/女生 或选中
  
  
  也可以用于多选
  <label for="sing">唱歌</label>
  <input type="checkbox" name="hobby" id="sing">
  
  <label for="dance">跳舞</label>
  <input type="checkbox" name="hobby" id="dance">
  
  <label for="rap">rap</label>
  <input type="checkbox" name="hobby" id="rap">
  
  <label for="basketball">篮球</label>
  <input type="checkbox" name="hobby" id="basketball">
  ```

### 十三、去除tab键选中效果

 ```css
 /*去除tab键选中效果 默认边框使用outline的边框*/
         input {
             outline: none;
         }
         input:focus {
             /*border-color: #31fab3;*/
             /*border-style: solid;*/
             border: #31fab3 solid;
         }
 
 
 tabindex属性设置位-1（负数就行） 不能使用tab选中
 ```



## 3. textarea元素

* 多行文本框

  ```html
  #textarea {
  	resize: none; // 不能进行大小缩放
  	resize: horizontal; // 只能水平缩放
  	resize: vertical; // 垂直方向
  	resize: both; // 水平垂直缩放，默认值
  }
  	
  
  <div>
      <span>简介：</span>
      <textarea name="" id="textarea" cols="30" rows="10"></textarea>
  </div>
  
  cols 代表最多显示20个字符
  rows 代表最多同时显示10行，但不代表只能输入10行
  ```
  
  ![](https://i.bmp.ovh/imgs/2021/05/ba1613f80e935da2.png)

## 4. select、option元素

* 下拉选择框

  ```html
  <div>
      <span>学历：</span>
      <select name="" id="">
          <!--  value是选择小学，高中之后对应的值，比如选择小学对应的值primary  -->
          <!--  而元素中的内容（小学），是给用户看的，让用户选择  -->
          <option selected value="primary">小学</option>
          <option value="middle">高中</option>
          <option value="university">大学</option>
      </select>
   </div>
  
  option元素的属性
  selected: 默认选中哪一项
  
  select元素的属性
  multiple: 可以多选
  size: 显示多少项 默认显示全部选项
  ```
  
  ![](https://i.bmp.ovh/imgs/2021/05/66c58b9922a49a18.png)
  
  

## 5. button元素

* 按钮

* 普通按钮实现一

  * ```html
    替换元素
    <input type="button" value="按钮">
    ```

* 普通按钮实现二

  * ```html
    非替换元素
    <button>
        按钮
    </button>
    ```

* 重置按钮

  * ```html
    重置按钮
    <input type="reset">
    <input type="reset" value="自定义文本内容">
    
    <button type="reset">重置</button>
    ```

* 提交按钮

  * 表单提交

  * ```html
    <input type="submit">
    
    <button type="submit">重置</button>
    
    <button>重置</button>
    button的type默认是submit 所以可以简写
    ```

    

## 6. label元素

* 表单元素的标题

## 7. fieldset元素

* 表单元素组

## 8. legend元素

* fieldset的标题

```html
<!--  边框  -->
<fieldset>
    <!--  标题  -->
    <legend>用户信息</legend>
    <div>
        <span>用户名：</span>
        <input type="text">
    </div>
    <div>
        <span>密 码：</span>
        <input type="password">
    </div>
</fieldset>

效果如下图所示
```



![](https://i.bmp.ovh/imgs/2021/05/e81f5053e1ff8133.png)

 

9. 表单提交
   * 方式一 传统表单提交
     * 将所有的input包裹在一个form中，form设置action（服务器地址）
     * input/button的type是submit
     * 点击submit，自动将所有数据提交给服务器
     * 弊端一：会进行页面的跳转（意味着服务器必须有一个写好的页面，并且将写好的页面返回给前端，前端直接展示这个页面）服务端渲染，就是服务器那边已经把页面渲染好了
     * 弊端二：不方便进行表单数据的验证
   * 方式二 前后端分离
     * 通过javascript获取所有表单内容
     * 通过正则表达式进行表单验证
     * 发送ajax请求将数据传递给服务器，服务器会返回结果（数据），并决定显示什么内容（前端渲染和前端路由）

