

## 一、单词缩写

* lang 是language的缩写 
* src 是source（源）的单词缩写
* charset，char(字符) set（设置）字符编码
* href 是 hypertext reference 的缩写 超级引用，超链接
* p元素是paragraph的缩写 （段落）
* SEO 是 search engine optimization 搜索引擎优化 
* br 是 break缩写 换行 打断的意思
* lt 是 less then 缩写 小于
* gt 是 greater than 缩写 大于
* eq = equal 等于
* ge = greater and equal 大于等于
* ne = not equal  不等于
* px 是 pixel 缩写 像素



## 二、html小知识

* 浏览器解析html代码

* 标签与内容组成的成为元素

* 一般说法：head元素、<head>标签

* 一般都是双标签，<div>11</div> 里面需要跟内容的都需要双标签（有开始标签和结束标签）

* 如果不需要跟内容的时候使用单标签<img>，<video>

* 元素名不区分大小写的<DIV></DIV>也可以这样写，因为浏览器不区分大小写，借用罗翔老师一句话，法律允许但不推荐。所以最好小写

* 属性是对元素的增强

* 公共属性：所有标签都有的属性，title，表现形式就是鼠标移入会显示文字

* w3c`建议`对html元素增加一个lang属性
  * 帮助语音合成工具确定要使用的发音
  * 帮助翻译工具确定要使用的翻译规则(弹出一个弹框，提示是否翻译此页，可以访问github去看一下)
  * `lang="en"`告诉浏览器，告诉html文档语言是英文，所以chorme浏览器的会提示是否翻译此页
  * `lang="zh"`是`lang="zh-CN"`简写表示这个html文档语言是中文
  
* 当使用img引入路径的时候，尽量使用相对路径，绝对路径麻烦，且别人下载你代码就不会显示。如果使用绝对路径尽量使用 `/ `而且

  windows支持`/`和`\`，linuex系统 和mac不支持`\`只支持`/`

## 三、元数据

```html
head元素里面的内容是一些元数据(描述数据的数据)
例如：meta，title，style，link，base，script，noscript

<head>
    // 字符编码 作用：将文字存储在计算机中，之后解析出来显示	
    // 应用：目前网页基本都是采用UTF-8编码，所以浏览器在解析时我们也需要告诉浏览器 当前我们使用的是UTF-8，浏览器才能正常解析
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    // 网页图标
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    // 网页标题
    <title><%= htmlWebpackPlugin.options.title %></title>
    // 网页base链接 配合a标签使用
    <base href='https://www.baidu.com' target='_blank'>

  </head>
```



## 四、 SEO优化

* 搜索引擎优化
* 搜索引擎有哪些：百度、搜狗、360、谷歌
* h标签对SEO优化有很大优势，尽量把重要信息放到H1里，尽量一个网站只有一个H1标签
* 乱用h标签元素不仅不会给网站带来好的权重，同时也有可能被搜索引擎认为作弊，最后导致k站
* 可以访问京东、淘宝等都是一个h1元素



## 五、字符实体(character entity)

* html中有一些字符是预留出来，做特殊用途的，比如 大于号 > 小于号 < 要想在网页中使用这些预留字符，必须使用字符实体
* 一般书写方式有两种
  * &entity_name;  实体名称 一般使用这种方式比较多
  * &#entity_number; 实体编码

* `&nbsp;` 空格
* `&lt;` 小于 <  less then 缩写
* `&gt` 大于 > greater than 缩写

## 六、html元素

* code 不常用

* pre 不常用

* strong 不常用

* span

* div

* p

* h 标签 h1-h6

* img

* a

  * href 属性 指定打开的URL

    ```html
    可以使用相对路径 比如说我想打开另一个html页面
    <a href='./aaa.html'>打开本地aaa页面</a>
    
    可以使用绝对路径
    <a href='https://www.baidu.com'>百度一下</a>
    ```

    

  * target 属性 在哪里打开URL

    * _self 默认值，在当前网页打开一个新页面
    * _blank  空白 在一个空白页打开新页面
    * _top  和  iframe一起使用才有用
    * _parent   iframe一起使用才有用 在当前浏览器中打开
    * 某个iframe的name值

    ```html
    <iframe 
            src="./aaa.html" 
            width="800"
            height="500"
            name='iframe-name'
           >
        
    </iframe>
    
    
    aaa.html的页面
    
    // 在iframe里的页面打开一个新页面 影响原来的 iframe
    <a href='https://www.baidu.com' target='_self'>百度一下</a> 
    
     // 在新的空白页中 打开一个新页面 不影响原来的iframe 与原来的_blank一样
    <a href='https://www.baidu.com' target='_blank'>百度一下</a>
    
    // 如果多个iframe嵌套 会在上一层的iframe 打开
    <a href='https://www.baidu.com' target='_parent'>百度一下</a> 
    
    // 如果多个iframe嵌套 会在最顶层 打开 替换所有的iframe 类似_self
    <a href='https://www.baidu.com' target='_top'>百度一下</a> 
    
    // target 也可以指定iframe 属性的name
    <a href='https://www.baidu.com' target='iframe-name'>百度一下</a> 
    
    当然我们每次像这样写 https://www.baidu.com 很麻烦 我们可以可以配合base元素使用 看第三章元数据 target属性也可以抽取哦
    <a href=''>百度一下</a> 
    ```

  * 当我们 `<a href=''>内容 </a>` ` <a href='#'>内容</a>`会实现类似于回到顶部的效果（锚点）

  * `<a href="javascript: alert('弹出一个弹框')">内容 </a>` 可以在href里写javascript代码

  * `<a href="" onclick="alert('弹出弹框')">内容 </a>` 也可以这样写

  * a链接不一定要跳转，也可以是一个下载的链接，比如github，也可以是一个邮箱，也可以是迅雷的链接



## 七、图片格式

* png: 静态图片，支持透明
* jpg：静态图片，不支持透明
* jpeg：与jpg一样，以前的操作系统只支持三位后缀名，比如.htm，所以以前图片都叫jpg，后来支持多位后缀名，有的改了jpeg，现在也通用
* gif：动态图片，静态图片，支持透明



## 八、URL

   URL: uniform resource locator(统一资源定位符)，URL就是资源的地址、位置，互联网上的每个资源都有唯一的URL

### 1. 输入URL会发生什么

* 当我们手动在浏览器输入一个地址例如`http://101.200.155.42:8080/dist/#/detail/1lyp2vg` 这个地址就是url
* 通过1个URL，能找到互联网上唯一的1个资源
* 浏览器会去网络上寻找这个资源，这个资源放在服务器里( 比如百度服务器，阿里服务器 )， 服务器其实就是一台电脑，也有自己的ip地址
* `http://101.200.155.42:8080`是域名 `https://www.baidu.com`也是域名，域名只是方便我们记忆，最终访问还是ip地址，比如我们访问百度，那最终其实是访问百度服务器的ip地址`183.232.231.173`
* 通过DNS服务器解析将域名转为ip地址的

### 2. 协议

* 简单的 url     协议://主机地址/路径    主机地址可以是域名，
* 复杂的 url     协议://主机地址:端口号（可选）/路径/参数(可选)/?query（可选）#fragment（锚点）
* 协议：不同的协议，代表这不同的资源查找方式，资源传输方式，https是在http基础上加了ssl协议
  * http，https协议
    * 超文本传输协议，访问的是远程网络资源，格式是http://
    * http协议是在网络开发中最常用的协议 默认端口80
    * https协议相当于是http协议的安全版
  * file协议
    * 访问的是本地计算机的资源，格式是file://(不用加主机地址)
  * mailto协议
    * 访问的是电子邮件的地址，格式为mailto:
  * ftp协议
    * 访问的是共享主机的文件资源，格式是ftp://  默认端口21
  * ed2k协议
    * 通过支持ed2k（专用下载链接）协议的p2p软件访问该资源（代表软件电驴），格式是ed2k://
  * thunder协议
    * 通过支持thunder（专用下载链接）协议的p2p软件访问该资源（代表软件迅雷），格式是thunder://



