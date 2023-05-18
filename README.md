## 项目注意点
### 接口统一管理
- 在api文件夹下的index.js文件中统一管理接口，将每个接口封装成函数并暴露，后续使用时直接调用函数即可

### 进度条包 nprogress
1. 安装nprogress   ```npm i nprogress```
2. 使用：
    1. 引入nprogress
    2. 引入nprogress样式
    3. 在请求拦截器里调用```nprogress.start()```,在响应拦截器成功回调里调用```nprogress.done()```
3. start方法表示进度条开始、done方法表示进度条结束，进度条的样式可以在```nprogress.css```文件中修改

### 三级联动组件数据的动态获取
1. 在三级联动组件TypeNav中，利用mounted钩子，在组件挂载完毕时，利用$store上的dispatch方法向vuex中home模块下的actions派发任务
2. 在actions里对应的方法中提交(commit)给mutations修改state数据
3. 引入api文件里统一管理的获取三级联动数据的请求方法，在mutations中发起请求，并将返回的数据赋值给state中的categoryList
4. 在TypeNav中引入映射方法mapState映射State中的categoryList，根据categoryList的数据动态渲染HTML中相应的数据
5. **注意**：state中categoryList的初始值要根据服务器返回的数据类型来给，服务器返回的是对象初始值就为空对象{},服务器返回的是数组，初始值就应该是空数组[]

#### 一级菜单动态添加背景颜色
1. 通过给一级菜单的样式利用鼠标悬停添加背景样式:hover
2. 通过js实现为每个一级菜单添加背景样式
    1. 在三级联动组件TypeNav里配置一个响应式数据:currentIndex 记录鼠标进入时一级菜单的下标
    2. 给一级菜单标题所在的h3标签绑定@鼠标移入事件```mouseenter```并传入index下标
    3. 在鼠标移入事件中将index下标的值赋值给data中的currentIndex记录  ```this.currentIndex = index```
    4. 循环遍历Item项时，如果满足下标和currentIndex中记录的下标相同，就动态绑定类名```:class = "{curStyle : currentIndex == index}"  ```(在curStyle样式里设置背景颜色)
    5. 此时仅仅是鼠标进入时会有背景颜色，但是鼠标移除后背景颜色会残留，因此需要再绑定@鼠标移出事件```mouseleave```,在对应的事件函数中将currentIndex值重置```this.currentIndex = -1```
    6. 如果想要实现鼠标悬浮在“全部商品分类盒子”时第0个一级菜单有背景颜色，需要全部商品分类盒子和一级菜单Item项是兄弟元素，且在他们外边包裹一个div，将鼠标移出事件绑定到该div上即可实现(这里利用了事件委派，div内子元素触发的事件会冒泡到他们的父元素上)

