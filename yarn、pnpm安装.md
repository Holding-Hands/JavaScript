### yarn、pnpm安装

#### 前言：

正值周末，想学习一下vue3源码，然后打开github，搜索`vue-next`，选择最新的`tag`，`git clone`下载，一切操作行云流水。

![](https://i.bmp.ovh/imgs/2021/12/c86b2fb59c892f51.png)

下载好项目之后就开始安装，执行`npm install` 命令，此时出现了问题，如下图。然后搜索一番之后。stack overflow有位老哥给我了解答，说他是用`yarn install`安装解决了。我就开始安装yarn之旅

![](https://i.bmp.ovh/imgs/2021/12/c8cc63ac114cd55b.png)

#### yarn安装

* npm install -g yarn
* https://yarnpkg.com/latest.msi 下载这个文件之后安装
  * 问题: 
    * 最开始我直接使用`npm install -g yarn`进行安装，之后运行`yarn --version` 或者`yarn -v`给我报错说yarn不是内部命令
    * 于是又是搜索了一番，发现https://yarnpkg.com/latest.msi 下载这个文件之后安装,环境变量自动给你配好了,网上的教程根本没提环境变量这一回事，都是直接执行`npm install -g yarn`然后就`yarn --version`了，也不知道他们是真行还是假行，反正我这是报错的。
    * 最后终于安装好嘞我就兴高采烈的去vue-next下执行`yarn install`，最后还是报错。看着报错信息,下面提示这个仓库需要用npmp包管理工具，就开始安装了npmp之旅
  * ![](https://i.bmp.ovh/imgs/2021/12/d39bbdb078e41a4b.png)



#### npm安装

* `npm install -g pnmp`
* `pnmp --version`
* 问题:
  * 他喵的老遇到问题，说我pnmp不是内部命令了。这回我直接去github上搜pnpm，然后看到[pnpm官网](https://pnpm.io/)，打开官网点击`Get Started`
  * 就开始往下读呀读，说是从 v16.13 开始，Node.js[提供了](https://nodejs.org/api/corepack.html)用于管理包管理器的[Corepack](https://nodejs.org/api/corepack.html)。这是一项实验性功能，因此您需要通过运行来启用它, 使用`Corepack`来管理包
  * 需要运行`corepack enable`去开启
  * `pnpm add -g pnpm` 运行这个命令升级pnpm
  * 然后在运行`pnpm -v`发现成功了，如下图
* ![](https://i.bmp.ovh/imgs/2021/12/298ab07c849d3019.png)

![](https://i.bmp.ovh/imgs/2021/12/670e0c5faddb08a0.png)

* 最后执行`pnpm install` 终于安装成功了
* ![](https://i.bmp.ovh/imgs/2021/12/43076822369d988f.png)

* 执行`pnpm dev`然后就开始我们的vue3之旅吧，哈哈好开心

* ![](https://i.bmp.ovh/imgs/2021/12/12c36658b0c8ab06.png)