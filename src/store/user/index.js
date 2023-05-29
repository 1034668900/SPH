// 登录与注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqUserLogout} from '@/api'

const state = {
    code: '',
    token: localStorage.getItem('USER_TOKEN'),
    userInfo: {}
}

const mutations = {
    // 获取验证码
    GETCODE(state,code){
        // 修改state
        state.code = code
    },

    // 登录
    USERLOGIN(state,token){
        state.token = token
        // 将token存储到浏览器本地
        localStorage.setItem("USER_TOKEN",token)
    },

    // 获取用户信息
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },

    // 清楚用户信息
    CLEARUSERINFO(state){
        // 把仓库中用户信息、以及本地存储的token清空
        state.token = '',
        state.userInfo = {},
        localStorage.removeItem('USER_TOKEN')
    }

}

const actions = {
    // 发请求获取验证码 -- 正常来讲应该由用户输入验证码，但是这里接口没提供该功能，于是自己模拟
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.data.code == 200){
            // 提交mutations
            commit("GETCODE",result.data.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 用户注册
    async userRegister({commit},data){
        let result = await reqUserRegister(data)
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('手机号已被注册'))
        }
    },

    // 用户登录
    async userLogin({commit}, data){
        let result = await reqUserLogin(data)
        if(result.data.code == 200){
            // 提交mutations
            commit('USERLOGIN',result.data.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('登录失败'))
        }
    },

    // 登录成功后获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.data.code == 200){
            commit('GETUSERINFO',result.data.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    } ,

    // 退出登录
    async userLogout({commit}){
        // 向服务器发起请求退出登录
        let result = await reqUserLogout()
        if(result.data.code == 200){
            // 清楚state中的数据
            commit("CLEARUSERINFO")
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}

export default{
    state,
    mutations,
    actions
}