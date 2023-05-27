import { reqUserAddress, reqOrderInfo } from '@/api'
import { add } from 'lodash'

const state = {
    // 地址
    userAddress: [],
    // 订单列表
    orderDetailList: []
}

const mutations = {
    // 获取用户的地址
    GETUSERADDRESS(state, address) {
        state.userAddress = address
    },

    // 获取用户订单详情
    GETORDERINFO(state, orderDetailList){
        state.orderDetailList = orderDetailList
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
        console.log(result.data);
        if(result.data.code == 200){
            commit('GETORDERINFO',result.data.data.detailArrayList
            )
        }
    }
}

export default {
    state,
    mutations,
    actions
}