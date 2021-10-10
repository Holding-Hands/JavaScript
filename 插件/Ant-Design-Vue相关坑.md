## Ant-Design-Vue相关坑

### 1. 年月选择选择

```vue
<a-month-picker :default-value="form.yearMonths"  format="YYYY-MM" @change="onTimeChange" placeholder="请选择月份"/>
```

```js
onTimeChange (time, timeString) {
      this.form.yearMonths = time
  }
这样设置默认值，然后修改值，相比element麻烦的很
```

### 2. select下拉框不回显的问题

```html
<a-form-item label="供应商" prop="supplierName">
            <a-select
              :style="{ width: '160px' }"
              allowClear
              showSearch
              v-model="form.supplierName"
              placeholder="请选择供应商">
              <a-select-option v-for="item in aSupplierList" :key="item.id" :value="item.supplierCode">{{
                item.name
              }}
              </a-select-option>
            </a-select>
          </a-form-item>

<a-select option-label-prop="label"  v-model="record.status" style="width: 80px">
   <a-select-option v-for="item in aAllResult" :key="item.status" :value="item.status" :label="item.message">     
       {{item.message }}
    </a-select-option>
</a-select>
v-model绑定的值 是 a-select-option 绑定value的值
defaultValue 与change事件 搭配才会变话 相当于v-model
```



```
进入页面后通过v-model对下拉框赋值,赋值成功了之后，当选择其它option时，值始终不改变，显示的依然是进入页面后绑定的值，也没有异常信息。排查之后发现是因为在data中，只定义了form并没有定义下面的supplierName这个key,将supplierName声明出来以后就解决了
```



### 3. 表格错位问题 

```vue
<!--   评审附件  -->
<span slot="reviewFile" slot-scope="text, record">
  <span v-if="record.auditOssList">
    <a :href="record.auditOssList[0].url" target="_Blank">
      {{ record.auditOssList ? record.auditOssList[0].fileName : '' }}
    </a>
  </span>
</span>

上面的代码时正常的

如果下面这样会如图所示 其实只是加了判断条件 但是不知道为什么会出现下图错位情况
<!--   评审附件  -->
  <span slot="reviewFile" slot-scope="text, record">
      <span v-if="record.auditOssList[0].url">
          <a :href="record.auditOssList[0].url" target="_Blank">
           {{ record.auditOssList ? record.auditOssList[0].fileName : '' }}
         </a>
      </span>
 </span>
```

![](https://ftp.bmp.ovh/imgs/2021/03/f0583cc6c1cb0ee7.png)



### 4. 去掉 ant-design-vue table边框

```css
/deep/ .ant-table-thead tr th {
  border: none;
}

/deep/ .ant-table-tbody tr td {
  border: none;
}
```

