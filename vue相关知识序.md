暂时不更新vue，只是想到哪随便写



vue执行顺序

`1. Props`，2.`methods`, 3.`data`和 4.`computed`的初始化都是在`beforeCreated`和`created`之间完成的。



```vue

...mapState({
  breadcrumb: state => state.breadcrumb,
  noticeMsgList: state => state.Message.noticeMsgList,
  currentUser: state => state.login.currentUser
}),
```

