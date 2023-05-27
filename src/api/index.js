// 当前模块用于统一管理接口
import requests from "./request";

// 三级联动接口
// /api/product/getBaseCategoryList         get 请求   不需要参数
export const reqCategoryList = () => {
    // axios请求返回的是一个Promise对象,且此处url不用再写/api，已经在baseUrl中配置
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取搜索列表数据     请求地址：/api/list        请求方式：post   需要参数
/* 
    此处的params至少是一个空对象，否则会请求失败
*/
export const reqSearchList = (params) => requests({
    url:'/list',
    method:'POST',
    // 携带参数
    data: params
})

// 获取商品详情的API   /api/item/{ skuId }        请求方式：get   
export const reqGoodInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'GET'
})

// 将商品添加到购物车或对已有商品进行数量上的改动
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateSkuNum = (skuId,skuNum) => requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'POST'
})

// 获取购物车列表
// /api/cart/cartList   GET
export const reqShopCartList = () => requests({
    url: '/cart/cartList',
    method: "GET"
})

// 删除购物车的数据
// /api/cart/deleteCart/{skuId}  DELETE
export const deleteShopOfCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE"
})

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}   GET
export const reqChangeChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET"
})

// 获取验证码的接口地址
// /api/user/passport/sendCode/{phone}  GET
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
})

// 用户注册的接口
// /api/user/passport/register   POST    phone code password
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'POST'
})

// 用户登录的接口
// /api/user/passport/login    POST   phone password
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'POST'
})

// 登录成功后获取用户信息
// /api/user/passport/auth/getUserInfo   GET   请求头中得携带token
export const reqGetUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
})

// 退出登录
// /api/user/passport/logout   GET
export const reqUserLogout = () => requests({
    url: '/user/passport/logout',
    method: "GET"
})

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  GET
export const reqUserAddress = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: "GET"
})

// 获取订单交易页信息
// /api/order/auth/trade   GET
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'GET'
})

// 提交商品订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}   POST
export const submitOrder = (tradeNo,data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'

})

// 获取支付信息
// /api/payment/weixin/createNative/{orderId} GET
export const reqGetOrderInfo = (orderId) => requests({
    url : `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
})

// 查询订单支付状态的api
// /api/payment/weixin/queryPayStatus/{orderId}   GET
export const searchResultPay = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`})