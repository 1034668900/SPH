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