// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
// 应用
Vue.use(VueRouter)


// 保存原生的push方法
let originPush = VueRouter.prototype.push
// 保存原生的Replace方法
let originReplace = VueRouter.prototype.replace

// 重写push方法
/* 
    参数一：路由跳转地址
    参数二：Promise成功的回调
    参数三：Promise失败的回调
*/
VueRouter.prototype.push = function (location, resolve, reject) {
    // 此时的this是VueRouter的实例
    // 判断是否传入resolve和reject
    if (resolve && reject) {
        /* 
            此处调用原生push需要修改this指向
            (push方法在VueRouter的原型上，只有VueRouter的实例对象才能访问到)
        */ 
        originPush.call(this, location, resolve, reject)
    } else {
        // 此处说明没有同时传入resolve和reject
        /* 
            call和apply的区别：
                1. 相同点：都可以调用函数一次、都可以篡改函数上下文一次
                2. 不同点：call传递参数需要用逗号隔开，apply传递参数要用数组
        */
        originPush.call(this,location, () => {}, () => {})
    }

}

// 重写replace方法
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this, location, resolve, reject)
    }else{
        originReplace.call(this, location, ()=>{}, ()=>{})
    }
}

// 配置路由
export default new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
      }

})

