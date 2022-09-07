### 记录一些vue相关知识

### 1. vue options执行顺序

`1. Props`，2.`methods`, 3.`data`和 4.`computed`的初始化都是在`beforeCreated`和`created`之间完成的。

```vue
...mapState({
  breadcrumb: state => state.breadcrumb,
  noticeMsgList: state => state.Message.noticeMsgList,
  currentUser: state => state.login.currentUser
}),
```



### 2. Mixin的合并规则

如果Mixin对象中的选项和组件对象中的选项发生了冲突，那么Vue会如何操作呢？

1.  如果是data函数的返回值对象
   * 返回值对象默认情况下会进行合并
   * 如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据
2.  如果是生命周期钩子函数
   *  生命周期的钩子函数会被合并到数组中，都会被调用（优先执行，mixin中的生命周期，在执行组件的声明周期）
3.  值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象
   *  比如都有methods选项，并且都定义了方法，那么它们都会生效
   *  但是如果对象的key相同（也就是定义了相同名的方法），那么会使用组件对象的方法，不会使用mixin的方法



### 3.  vue2与vue3创建实例的区别

1. vue2.x 是通过`new Vue()`，构造函数的方式来创建实例, vue2中，所有Vue实例是共享一个Vue构造函数对象的，包括全局指令/全局组件，无法做到相互隔离。也就是说我们整个项目中，只有一个**根Vue实例**，其他的单文件组件创建的 Vue实例（vue组件）都会成为它的**子实例**。

   ```javascript
   import Vue from 'Vue'
   import APP from './APP.vue'
   
   const vm = new Vue({
   	render:h => h(APP)
   })
   vm.$mount('#app')
   ```

   

 2. vue3.x  通过`createApp`工厂函数来创建实例 

    ```javascript
    import { createApp } from 'vue'
    import APP from './APP.vue'
    
    const app = createApp(APP)
    app.mount('#app')
    ```

​		

### 4.  vue2中使用extends属性，实现类似mixins

 ![](https://s3.bmp.ovh/imgs/2022/09/07/65e27ab03064838a.png) 

* 如上图所示，与mixin效果一样，合并规则也和mixin形同，但如果同时有mixin和extends，那么生命周期执行顺序，先执行extends，在执行mixin，最后执行vue组件内
*  在开发中extends用的非常少，在Vue2中比较推荐大家使用Mixin，而在Vue3中推荐使用Composition API

