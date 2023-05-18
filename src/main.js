import Vue from 'vue'
import App from './App.vue'
// 引入三级联动组件
import TypeNav from './components/TypeNav/TypeNav.vue'
// 引入仓库
import store from './store'
// 引入路由
import router from './router/index'
import {reqCategoryList} from './api/index'
// 注册三级联动组件为全局组件
Vue.component(TypeNav.name,TypeNav)

// 取消Vue生产提示
Vue.config.productionTip = false

reqCategoryList()

new Vue({
 render: h => h(App),
 // 注册路由
 router,
 // 注册仓库
 store
    
}).$mount('#app')