import { reqUserAddress, reqOrderInfo } from '@/api'
import { add } from 'lodash'

const state = {
    // 地址
    userAddress: [],
    // 订单列表
    orderDetailList: [],
    orderInfo:{}
}

const mutations = {
    // 获取用户的地址
    GETUSERADDRESS(state, address) {
        state.userAddress = address
    },

    // 获取用户订单详情
    GETORDERINFO(state, orderInfo){
        state.orderDetailList = orderInfo.data.detailArrayList
        state.orderInfo = orderInfo
    }
}

const actions = {
    // 获取用户的地址
    async getUserAddress({ commit }) {
        let result = await reqUserAddress()
        if (result.data.code == 200) {
            commit('GETUSERADDRESS', result.data.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 获取订单交易页信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.data.code == 200){
            commit('GETORDERINFO',result.data
            )
        }
    }
}

export default {
    state,
    mutations,
    actions
}