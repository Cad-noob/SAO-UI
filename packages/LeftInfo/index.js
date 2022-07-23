// 导入组件，组件必须声明 name
import LeftInfo from './src'

// 为组件提供 install 安装方法，供按需引入
LeftInfo.install = function (Vue) {
    Vue.component(LeftInfo.name, LeftInfo)
}

// 导出组件
export default LeftInfo;