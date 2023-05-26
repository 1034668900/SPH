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