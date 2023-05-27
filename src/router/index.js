// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '@/store'
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
        originPush.call(this, location, () => { }, () => { })
    }

}

// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
const route = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }

})



// 全局前置守卫
route.beforeEach(async (to, from, next) => {
    // 获取token
    let token = localStorage.getItem('USER_TOKEN')
    let userName = store.state.user.userInfo.name
    // 用户已经登录
    if (token) {
        // 限制用户登录后不能再跳转登录页面
        if (to.path == "/login") {
            next('/home')
        } else {
            // 用户登录了，但是没有去登录页面
            /* 注意这里不能用userInfo来判断，因为即使是空对象也会转换为true */
            if (userName) {
                // 有用户名,放行
                next()
            } else {
                try {
                    // 登录了，没有用户名了(刷新就会掉)，重新派发action获取用户信息
                    let result = await store.dispatch('getUserInfo')
                    // 然后放行
                    next()
                } catch (error) {
                    // token失效了，获取不到用户信息，需要清除用户信息，重新登录
                    await store.dispatch('userLogout')
                    // 重新跳转到登录页面
                    next('/login')
                }
            }
        }

    } else {
        // 用户没有登录--这里还有很多事要做，暂时搁置
        next()
    }

})

export default route

