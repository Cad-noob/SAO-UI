// 导入组件，组件必须声明 name
import MenuBar from './src'

// 为组件提供 install 安装方法，供按需引入
MenuBar.install = function (Vue) {
    Vue.component(MenuBar.name, MenuBar)
}

// 导出组件
export default MenuBar;
