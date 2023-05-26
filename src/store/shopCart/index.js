import { reqShopCartList } from "@/api";
import { deleteShopOfCart } from "@/api";
import {reqChangeChecked} from '@/api'

const state = {
    //购物车数据
    cartList: []
}

const actions = {
    // 获取购物车列表的actions
    async getShopCartList({ commit }) {
        let result = await reqShopCartList()
        if (result.data.code == 200) {
            // 提交mutations
            commit("GETSHOPCARTLIST", result.data)
        }
    },

    // 删除购物车单个数据
    async deleteShopOfCart({commit},skuId){
        let result = await deleteShopOfCart(skuId)
        if(result.data.code==200){
           return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 切换商品选中状态
    async changeChecked({commit},{skuId,isChecked}){
        let result = await reqChangeChecked(skuId,isChecked)
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("failed"))
        }
    },

    // 删除选中商品
    deleteCheckedGoodsOfCart(context){
        let cartList = context.state.cartList[0].cartInfoList

        let PromiseArr = []
        console.log(cartList);
        // 遍历购物车列表
        cartList.forEach( item => {
           if(item.isChecked == 1){
                // 派发action给删除购物车单个数据
                let promise =  context.dispatch('deleteShopOfCart',item.skuId)
                PromiseArr.push(promise)
           }
        })
        // 只要有一个promise失败，则失败
        return Promise.all(PromiseArr)
    },

    // 全选商品
    toCheckedAll({dispatch,state},isChecked){
        let PromiseArr = []

        let cartList = state.cartList[0].cartInfoList
        cartList.forEach(item => {
          let promise = dispatch('changeChecked',{skuId:item.skuId, isChecked})
          PromiseArr.push(promise)
        })

        return Promise.all(PromiseArr)

    }
}

const mutations = {
    GETSHOPCARTLIST(state, cartList) {
        // 存储数据
        state.cartList = cartList.data
    }

}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}