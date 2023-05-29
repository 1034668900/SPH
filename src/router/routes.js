// 引入路由组件
import Home from "@/pages/Home/Home.vue";
import Search from "@/pages/Search/index.vue";
import Login from "@/pages/Login/index.vue";
import Register from "@/pages/Register/index.vue";
import Detail from "@/pages/Detail/index.vue";
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue";
import ShopCart from "@/pages/ShopCart/index.vue";
import Trade from "@/pages/Trade/index.vue";
import Pay from "@/pages/Pay/index.vue";
import PaySuccess from "@/pages/PaySuccess/index.vue";
import Center from "@/pages/Center/index.vue";
import MyOrder from "@/pages/Center/MyOrder/index.vue";
import GroupOrder from "@/pages/Center/GroupOrder/index.vue";

export default [
  {
    name: "Center",
    path: "/center",
    component: Center,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
    children: [
      {
        name: "MyOrder",
        path: "myorder",
        component: MyOrder,
      },
      {
        name: "GroupOrder",
        path: "grouporder",
        component: GroupOrder,
      },
      {
        // 进入Center组件是应该默认显示我的订单，因此这里重定向
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    name: "paysuccess",
    path: "/paysuccess",
    component: PaySuccess,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
  },
  {
    name: "pay",
    path: "/pay",
    component: Pay,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
    beforeEnter: (to,from,next) => {
        // 只有路径是来自trade页面才能进行支付
        if(from.path == "/trade"){
            next()
        }else{
            // 不是则将其返回原处
            next(false)
        }
    }
  },
  {
    name: "trade",
    path: "/trade",
    component: Trade,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        // 只有路径时来自购物车，才能进入trade页面
        
        next();
      } else {
        // 路径不是购物车时将其返回原处
        /* 
            false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，
        那么 URL 地址会重置到 from 路由对应的地址
        */
        next(false);
      }
    }
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
  },
  {
    path: "/detail/:skuId?",
    component: Detail,
    meta: {
      isShowFooter: true,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: {
      // 是否显示Footer
      isShowFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  // 重定向 -- 当项目运行起来时，重定向到指定路径
  {
    path: "*",
    redirect: "/home",
  },
];
