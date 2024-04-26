#### vite项目配置

#### 1. 去ref的.value插件

* npm网址：https://www.npmjs.com/package/@vue-macros/reactivity-transform

* 安装：pnpm i @vue-macros/reactivity-transform

#### 2. 自动导入插件，解决import { ref, watch } from "vue"大量引入问题

* unplugin-auto-import插件，npm网址：https://www.npmjs.com/package/unplugin-auto-import

* 安装： pnpm i unplugin-auto-import 

* vite-config-ts中配置

* ```js
  import AutoImport from 'unplugin-auto-import/vite'
  
  export default defineConfig({
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: false, // 默认false, true启用。第一次设置true运行项目自动生成，生成之后设置false避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 运行项目时生成json文件
          globalsPropValue: true,
        },
        // 声明文件生成位置和文件名称
        dts: './src/auto-import.d.ts',
      }),
    ],
  })
  ```

* ```js
  // 运行生成'./.eslintrc-auto-import.json'文件后在.eslintrc配置，extends
  module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', './.eslintrc-auto-import.json'], // 配置'./.eslintrc-auto-import.json'
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-model-argument': 'off',
      'no-undef': 'off',
      'prettier/prettier': 'error',
    },
    globals: { $ref: 'readonly', $computed: 'readonly', $shallowRef: 'readonly', $customRef: 'readonly', $toRef: 'readonly' },
  };
  ```

* 



#### 3.  自动导入插件，解决import ComponentA from "./component-a"引入问题

* npm网址：https://www.npmjs.com/package/unplugin-vue-components

* 安装：pnpm i unplugin-vue-components

* 使用

* ```vue
  <template>
    <div>
      <HelloWorld msg="Hello Vue 3.0 + Vite" />
    </div>
  </template>
  
  <script>
  // 不在需要引入HelloWorld组件就可以使用
  </script>
  ```

* vite-config-ts中配置

* ```js
  import Components from 'unplugin-vue-components/vite'
  
  export default defineConfig({
    plugins: [
      vue(),
      Components({
        dirs: ['src/components', 'src/views'], // 进行导入的组件位置
      }),
    ],
  })
  ```