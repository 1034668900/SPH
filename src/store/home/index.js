// 引入api中三级联动请求接口
import {reqCategoryList} from '@/api/index.js'

// state：仓库存储数据的地方
const state = {
    categoryList:[]
}

// mutations：修改state的唯一手段
const mutations = {
    async CATEGORYLIST(){
        let categoryList = await reqCategoryList()
        state.categoryList = categoryList.data
    }
      
}

// actions：可以书写自己的业务逻辑，也可以处理异步，但是不能修改state
const actions = {
    // 从context上下文中解构出commit，提交mutations
    categoryList({commit}){
        commit("CATEGORYLIST")
    }
}

// 读取属性时触发相应回调，可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters

}