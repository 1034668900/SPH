// 节流
function throttle(cb, delayTime) {
    // 节流标识
    let flag = false
    return function () {
        if (!flag) {
            // 进入此处说明节流阀关闭,准备执行函数，同时立马将节流阀打开
            flag = true
            setTimeout(() => {
                cb.call(this,arguments)
                // 执行完毕后将节流阀关闭
                flag = false
            }, delayTime)
        } else {
            return
        }
    }

}

export default throttle

