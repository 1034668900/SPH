// VeeValidate插件表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is: (failed) => `${failed}必须与密码相同`, // 修改内置规则的message
   
    },
    attributes:{
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

// 自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate: value => {
        return value
    },
    getMessage: failed => failed + '必须同意'
})
