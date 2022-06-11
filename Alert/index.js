// 导入组件，组件必须声明 name
import SaoAlert from './src'

// 为组件提供 install 安装方法，供按需引入
SaoAlert.install = function (Vue) {
    Vue.component(SaoAlert.name, SaoAlert)
}

// 导出组件
export default SaoAlert;