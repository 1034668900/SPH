// 引入路由组件
import Home from '@/pages/Home/Home.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'

export default [
    {
        name:'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        name:'pay',
        path: '/pay',
        component: Pay,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        name:'trade',
        path: '/trade',
        component: Trade,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        name:'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        name:'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            // 是否显示Footer
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    // 重定向 -- 当项目运行起来时，重定向到指定路径
    {
        path: '*',
        redirect: '/home'

    }
]