import Vue from 'vue'
import App from './App.vue'
// 引入三级联动组件
import TypeNav from './pages/Home/TypeNav/TypeNav.vue'
// 引入路由
import router from './router/index'
import {reqCategoryList} from './api/index'
// 注册三级联动组件为全局组件
Vue.component(TypeNav.name,TypeNav)

reqCategoryList()

new Vue({
 render: h => h(App),
 // 注册路由
 router
    
}).$mount('#app')