// 导入组件，组件必须声明 name
import HP from './src'

// 为组件提供 install 安装方法，供按需引入
HP.install = function (Vue) {
    Vue.component(HP.name, HP)
}

// 导出组件
export default HP;