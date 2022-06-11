// 导入组件，组件必须声明 name
import LinkStart from './src'

// 为组件提供 install 安装方法，供按需引入
LinkStart.install = function (Vue) {
    Vue.component(LinkStart.name, LinkStart)
}

// 导出组件
export default LinkStart;