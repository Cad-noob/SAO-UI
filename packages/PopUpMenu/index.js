// 导入组件，组件必须声明 name
import PopUpMenu from './src'

// 为组件提供 install 安装方法，供按需引入
PopUpMenu.install = function (Vue) {
    Vue.component(PopUpMenu.name, PopUpMenu)
}

// 导出组件
export default PopUpMenu;
