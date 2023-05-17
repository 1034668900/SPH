### 项目注意点
#### 接口统一管理
- 在api文件夹下的index.js文件中统一管理接口，将每个接口封装成函数并暴露，后续使用时直接调用函数即可

#### 进度条包 nprogress
1. 安装nprogress   ```npm i nprogress```
2. 使用：
    1. 引入nprogress
    2. 引入nprogress样式
    3. 在请求拦截器里调用```nprogress.start()```,在响应拦截器成功回调里调用```nprogress.done()```
3. start方法表示进度条开始、done方法表示进度条结束，进度条的样式可以在```nprogress.css```文件中修改
