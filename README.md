# todos_with_vue2_and_koa2

## 简介
#### 前端：
    1.通过vue-cli3生成前端框架：集成less, element-ui, vuex状态控制, moment
    
    2.配置axios的请求拦截和响应拦截，设置请求加载和错误统一处理，配置在plugin => axios.js
    
    3.element-ui是按需加载，配置在plugin => element.js
    
   4. less修改element的局部默认样式如下：（样式穿透）
```
    /deep/ .el-checkbox__label{
        width: -webkit-fill-available;
    }
```

***

#### 服务端：
    1.controller文件夹处理接口的响应
    
    2.db处理数据库
    
    3.middlewares：处理中间件：如 check-auth.js身份校验，rest.js设置统一的rest响应风格和错误响应风格，router.js配置接口路由
    
    4.module-alias模块处理别名路径引用
    
    5.nodemon模块处理node服务端热更新开发问题
    
***

### 本地预览
克隆到本地：
```js
    $ git clone git@github.com:ry836478606/todos_with_vue2_and_koa2.git
```
启动前端项目：
```js
    $ cd todos_with_vue2_and_koa2 （这个是前端项目，后端项目在server）
    $ npm install / yarn install
    $ npm run serve
```


启动服务端项目：
```js
    $ cd server
    $ npm install / yarn install
    $ npm run dev
```

***

### 目录结构描述
        ├── public                       
        ├── server                // 服务端代码
        │   ├── controller        // 接口的控制器
        │   ├── db                // 数据库
        │   ├── middlewares        // 中间件
        │   ├── utils              // 工具
        │   ├── app.js          
        │   ├── config.js          // 配置文件
        │   └── package.json        
        ├── src                      // 前端代码
        │   ├── assets               // 静态资源
        │   ├── components            // 组件
        │   ├── plugins               // 中间件，插件
        │   ├── router                // 路由配置
        │   ├── store                 // vuex
        │   ├── views                 // 页面
        │   ├── App.vue       
        │   └── mai.js         
        ├── babel.config.js
        ├── package.json
        └── vue.config.js
