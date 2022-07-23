// 导入组件，组件必须声明 name
import ChildBar from './src'

// 为组件提供 install 安装方法，供按需引入
ChildBar.install = function (Vue) {
    Vue.component(ChildBar.name, ChildBar)
}

// 导出组件
export default ChildBar;