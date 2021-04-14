1. 由于element的表格，行的Id（string）类型与下拉列表id类型（number）不一致，所以导致显示id不显示id对应的数据

2. 表单验证规则，即使用了pattern又使用了validator校验函数出现的问题

3. element中的el-input-number从后套获取数据赋值给默认值，不生效的时候，使用$nextTick

4. <el-table-column type="selection" width="55"/> 表格选中

5. element分页请求的时候，最开始是每页显示20条，总共6页，当切换每页显示30条之后，会请求两次数据，size请求的就会为空，page请求是有数据，这样会导致渲染错误，解决：计算根据size计算当前总数，是否超过总数，如果超过，不请求数据，让page页去请求数据

6.  element的弹框不带动画的原因可能是你使用了v-if

7.  element弹框顶部是由白色的和黑色的背景组成的 需要将header和dialog一起设置圆角

   ```css
   .el-dialog__header {
         border-radius: 6px 6px 0 0;
    }
   
    // 加圆角无多余空白 改变底部圆角和顶部
   .el-dialog {
       border-radius: 6px 6px 6px 6px;
   }
   
   ```

8. 当表单验证有下拉框的时候，可能刚开始校验会有问题，这时候要使用表单重置函数 例如 this.$refs.form.resetFields();

9. 当使用el-dialog编辑的时候给默认输入框，例如时间赋值发现修改不了 这时候赋值要使用深拷贝 例如 JSON.parse(JSON.stringify(row))

10. 对于有多选的 multiple 表单验证 一进入页面 可能自动校验 那么使用 this.$nextTick(callback)

11. 设置默认选中某行的样式

    ```vue
     this.$refs.leftTable.setCurrentRow(row, true);
    ```

    

12.  element的滚动条当鼠标移入才显示，移除消失

    ```css
    ::-webkit-scrollbar-thumb {
         /* border-radius: 5px; */
         /* -webkit-box-shadow: inset 0 0 5px rgba(59, 133, 255, 0.3); */
         /* box-shadow: inset 0 0 5px rgba(59, 133, 255, 0.3); */
         /* background: rgba(59, 133, 255, 0.2); */
    }
    ```

    

13. 

