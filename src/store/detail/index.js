// 引入商品详情页的API
import { reqGoodInfo, reqAddOrUpdateSkuNum } from "@/api"
import { getUUID } from '@/utils/uuid_token'



const state = {
    // 存储商品详情信息的对象
    goodDetailInfo: {},
    // 记录游客的临时身份
    uuid_token: getUUID()
}

const mutations = {
    GETGOODINFO(state, result) {
        // 更新商品详情信息
        state.goodDetailInfo = result.data
    }

}

const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodInfo(skuId)
        // 判断请求是否成功--提交mutations
        if (result.data.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },

    // 添加商品或更新商品数量的actions
    async getAddOrUpdateSkuNum({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateSkuNum(skuId, skuNum)
        // 这里请求返回的结果中没有具体的data数据，只有此处请求是否成功，因此actions中不用再提交mutations
        if (result.data.code == 200) {
            // 请求成功
            return "ok"
        } else {
            // 请求失败
            return Promise.reject(new Error('failed'))
        }
    }

}

const getters = {
    // getters里的state是本仓库的state
    categoryView(state) {
        // 数据还没返回时goodDetailInfo还是一个空对象，
        //读取一个空对象的属性会返回undefined，后面使用时读取undefined的属性会出现假报错，因此没数据时返回一个空对象,读取空对象的属性不会报错
        return state.goodDetailInfo.categoryView || {}
    },

    skuInfo(state) {
        return state.goodDetailInfo.skuInfo || {}
    },

    spuSaleAttrList(state) {
        return state.goodDetailInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}