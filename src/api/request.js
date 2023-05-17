// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'

// 利用axios对象的create方法创建一个axios对象实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: '/api',
    // 设置请求超时时间
    timeout:5000,


})

// 请求拦截器：在发请求之前请求拦截器可以检测到并执行一些操作
requests.interceptors.request.use((config) => {
    // config: 配置对象 ，对象里面的 header 请求头属性非常重要
    nprogress.start()
    return config

})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 服务器响应成功的回调
    nprogress.done()
    return res
}, (err) => {
    // 服务器响应失败的回调
    return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests