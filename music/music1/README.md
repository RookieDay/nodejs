# 我的音乐项目案例

## 需求分析

我们需求分析的目的就是要请求自己到底要做什么。先不要考虑怎么做

- 首页
  + 展示音乐列表
  + 可以播放音乐
  + 歌词滚动播放（附加题）
- 添加音乐页面
  + 用户可以添加音乐信息
  + 用户可以上传音乐文件
- 编辑音乐页面
  + 用户可以修改音乐信息
  + 用户可以更换歌曲文件
- 删除音乐页面
  + 用户可以删除歌曲文件
- 查询音乐信息
  + 在首页放置一个搜索框，当用户点击搜索的时候把音乐信息检索出来

## 路由设计

路由的作用就是用来 根据 不同的 url 请求路径分发 具体的响应处理。
所以，我们在开发之前，就要设计 url 路径

GET   /       渲染首页
GET   /add    渲染添加音乐页面
POST  /add    处理用户添加音乐请求
GET   /edit?mid=xx   渲染编辑音乐页面
POST  /edit    处理用户编辑音乐请求
GET   /remove?mid=xx 处理用户删除音乐请求

ajax 路由
GET /music  把数组中的歌曲信息以 json 格式字符串的形式响应给客户端

## 功能开发

### `package.json` 文件初始化

`npm init [-y]`  `-y` 标识可选的

### 项目依赖的第三方功能包


我们把一些前端依赖的第三方包放到  `devDependencies` 开发依赖环境中
- bootstrap UI框架  `npm install --save-dev bootstrap`
- jQuery DOM操作库 `npm install --save-dev jquery`
- art-template 模板引擎 `npm install --save-dev art-template`

我们把后台依赖的一些第三方包放到 `dependencies` 中
