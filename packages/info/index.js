// 导入组件，组件必须声明 name
import Info from './src'

// 为组件提供 install 安装方法，供按需引入
Info.install = function (Vue) {
    Vue.component(Info.name, Info)
}

// 导出组件
export default Info;