// 当前模块用于统一管理接口
import requests from "./request";

// 三级联动接口
// /api/product/getBaseCategoryList         get 请求   不需要参数
export const reqCategoryList = () => {
    // axios请求返回的是一个Promise对象,且此处url不用再写/api，已经在baseUrl中配置
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}