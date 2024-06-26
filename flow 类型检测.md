## Flow 类型检测

### 学习背景

### 一、认识Flow

[Flow](https://flow.org/en/)是facebook 出品的 JavaScript 静态类型检查工具。Vue2的源码利用了Flow做了静态类型检查(Vue3使用TS进行类型检测)，所以了解Flow有助于我们阅读源码

### 二、为什么用Flow

JavaScript 是 动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码，在编译期甚至看上去都不会报错，但在运行阶段就可能出现各种奇怪的 bug。

类型检查是当前动态类型语言的发展趋势，所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型），使编写 JavaScript 具有和编写 Java 等强类型语言相近的体验。

项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 Flow 做静态类型检查。之所以选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以支持语法，可以完全沿用现有的构建配置，非常小成本的改动就可以拥有静态类型检查的能力。

### 三、Flow的工作方式

通常类型检查分成 2 种方式：

1. `类型推断`：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
2. `类型判断`：它不需要任何代码修改即可进行类型检查，最小化开发者的工作量。它不会强制你改变开发习惯，因为它会自动推断出变量的类型。这就是所谓的类型推断，Flow 最重要的特性之一。

`类型注释`：事先注释好我们期待的类型，Flow 会基于这些注释来判断。