import Vue from 'vue'
import App from './App.vue'
// 引入三级联动组件
import TypeNav from './components/TypeNav/TypeNav.vue'
// 引入仓库
import store from './store'
// 引入路由
import router from './router/index'
import { reqCategoryList } from './api/index'
// 引入轮播图样式
import '../node_modules/swiper/css/swiper.css'

// 注册三级联动组件为全局组件
Vue.component(TypeNav.name, TypeNav)

// 取消Vue生产提示
Vue.config.productionTip = false
// 请求三级联动列表数据
reqCategoryList()


new Vue({
    render: h => h(App),
    // 注册路由
    router,
    // 注册仓库
    store,
    // 配置全局事件总线$bus -- 将vm对象存放在Vue的原型对象上
    beforeCreate(){
        Vue.prototype.$bus = this
    },
    mounted() {
        // 派发actions，获取三级联动组件菜单数据
        this.$store.dispatch("categoryList");
    },


}).$mount('#app')