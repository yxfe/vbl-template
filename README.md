# 参考

## 命令行

* 安装依赖
npm install

安装之前设置如下：
npm set registry http://nexus.yixincapital.com/repository/npm-group/

* 本地启服务 localhost:9999
npm run dev

* 打包，准备上线（或者测试）版本
npm run build

## 目录结构

* build 本地编译以及打包配置文件
* config 本地编译以及打包配置文件用到的变量用户配置文件
* dist 打包文件目录，包括最终生成的index.html和static（images、css、js）
* static 需要直接引用的资源
* src 源代码目录
    * assets 需要webpack管理的资源
    * directives 公共指令文件夹
    * components
        * common公共组件文件夹，比如上传图片组件多处使用，可以考虑放到这里
        * 其它业务组件文件夹，按页面或者模块以文件夹分类
        * app.vue 容器组件
    * utils 公共工具，比如验证函数，filter函数
    * routes.js 路由引入
    * plugins.js 公用plugin
    * main.js 入口文件
* index.ejs 首页模板
* package.json 依赖配置
* README.md 说明文件

