// 导入组件，组件必须声明 name
import Live2d from './src'

// 为组件提供 install 安装方法，供按需引入
Live2d.install = function (Vue) {
    Vue.component(Live2d.name, Live2d)
}

// 导出组件
export default Live2d;