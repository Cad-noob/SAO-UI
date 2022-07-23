//节流立即执行，绑定事件，多参版
export const throttle = function(func,wait,...arg) {
    let timer = null;
    return function (e) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            func.apply(this,[...arg,e])
        }
    }
}

