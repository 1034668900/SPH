import {reqSearchList} from '@/api/index'
const state = {
    // 搜索列表的数组
    searchList: {}
}
const mutations = {
    // 修改state
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList.data
    }
}
const actions = {
    // Search列表数据请求的params至少是一个空对象，这里直接在形参里给一个默认值
    // 获取Search列表的数据
    async getSearchList({commit}, params = {}){
        let result = await reqSearchList(params)
        // 判断请求结果提交mutations
        if(result.data.code == '200'){
        commit('GETSEARCHLIST',result.data)
        }
    }
}
const getters = {
    /* 
    存在问题：
        将search组件中需要用到的数据进行整理,
        但是有时网络太慢时，可能导致服务器数据还没返回，
        此时searchList是一个空数组，读取空数组里的属性会返回undefined，此时会导致报错
    解决方案：
        当左边为undefined时，返回一个空数组 
    */
    goodsList(state){
        return  state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}


export default {
    state,
    mutations,
    actions,
    getters

}