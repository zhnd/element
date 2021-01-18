# element

基于 `element-ui v2.13.2` 开发UI组件，感谢Element团队。

## Install
```shell
npm i github:zhnd/element -S
```

## 开发
- `packages` 下创建组件目录结构。
- 配置 `components.json`。
- 执行 `npm run dist` 打包文件。
- 可以运行 `npm run dev:play`，修改 `examples/play/index.vue` 文件，调用组件，访问 [http://localhost:8085](http://localhost:8085)，查看效果。

## 组件
- el-district 省市区选择
#### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 值 | Array | — | ['', '', '']
| clearable | 是否显示清除按钮 | Boolean | — | false
| spacing | 间距 | String / Number | — | —
- okr-tree [组织架构树组件](https://github.com/qq449245884/vue-okr-tree)

## LICENSE
[MIT](LICENSE)
