// 导入button组件
import SaoAlert from '../packages/Alert'
import LinkStart from '../packages/LinkStart'
import Live2d from '../packages/Live2d'
import HP from '../packages/HP'

// 组件列表
const components = [
    SaoAlert,
    LinkStart,
    Live2d,
    HP
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    SaoAlert,
    LinkStart,
    Live2d,
    HP
}

//拖拽
export const Drag = {
    update: function (el,binding) {
        el.onmousedown = function (ev) {
            if(binding.value){
                // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
                let sX = ev.clientX - el.offsetLeft
                let sY = ev.clientY - el.offsetTop
                // 不断地更新元素的left、top值
                document.onmousemove = function (ev) {
                    el.style.left = ev.clientX - sX + 'px'
                    el.style.top = ev.clientY - sY + 'px'
                }
                document.onmouseup = function (event) {
                    document.onmousemove = null
                }
            }
        }
    }
}