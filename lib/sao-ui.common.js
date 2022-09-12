// 导入button组件
import SaoAlert from '../packages/Alert'
import LinkStart from '../packages/LinkStart'
import Live2d from '../packages/Live2d'
import HP from '../packages/HP'
import PopUpMenu from "../packages/PopUpMenu";
import MenuBar from "../packages/MenuBar";
import LeftInfo from "../packages/LeftInfo";
import ChildBar from "../packages/ChildBar";

// 组件列表
const components = [
    SaoAlert,
    LinkStart,
    Live2d,
    HP,
    PopUpMenu,
    MenuBar,
    LeftInfo,
    ChildBar
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
    // 判断是否安装
    // if (install.installed) return
    // 遍历注册全局组件
    console.log(components)
    components.map(component => Vue.component(component.name, component));

    Vue.prototype.$EventBus = new Vue();

    const ascii = `
 ________  ________  ________                 ___  ___  ___     
|\\   ____\\|\\   __  \\|\\   __  \\               |\\  \\|\\  \\|\\  \\    
\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\|\\  \\  ____________\\ \\  \\\\\\  \\ \\  \\   
 \\ \\_____  \\ \\   __  \\ \\  \\\\\\  \\|\\____________\\ \\  \\\\\\  \\ \\  \\  
  \\|____|\\  \\ \\  \\ \\  \\ \\  \\\\\\  \\|____________|\\ \\  \\\\\\  \\ \\  \\ 
    ____\\_\\  \\ \\__\\ \\__\\ \\_______\\              \\ \\_______\\ \\__\\
   |\\_________\\|__|\\|__|\\|_______|               \\|_______|\\|__|
   \\|_________|                                                 
               by Chen Andy https://github.com/Cad-noob/SAO-UI`;

    console.log(`%c${ascii}`,'color:rgb(33,171,220)');
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install
}

export {
    // 以下是具体的组件列表
    SaoAlert,
    LinkStart,
    Live2d,
    HP,
    PopUpMenu,
    MenuBar,
    LeftInfo,
    ChildBar
}

function dragDom(ev,el,binding){
    if(binding.value){
        let sX = ev.clientX - el.offsetLeft
        let sY = ev.clientY - el.offsetTop
        // 不断地更新元素的left、top值
        function move(ev){
            el.style.left = ev.clientX - sX + 'px'
            el.style.top = ev.clientY - sY + 'px'
        }

        addEventListener('mousemove',move);
        addEventListener('mouseup',function (){
            removeEventListener('mousemove',move)
        })
    }
}

function dragX(ev,el,binding){
    if(binding.value){
        let sX = ev.clientX - el.offsetLeft
        // 不断地更新元素的left、top值
        function moveX(ev){
            el.style.left = ev.clientX - sX + 'px'
        }

        addEventListener('mousemove',moveX);
        addEventListener('mouseup',function (){
            removeEventListener('mousemove',moveX)
        })
    }
}

//拖拽
export const Drag = {
    bind: function (el,binding) {
        el.addEventListener('mousedown',(ev)=>{
            dragDom(ev,el,binding);
        })
    },
    update:function (el,binding) {
        el.addEventListener('mousedown',(ev)=>{
            dragDom(ev,el,binding);
        })
    }
}

export const DragX = {
    bind: function (el,binding) {
        el.addEventListener('mousedown',(ev)=>{
            dragX(ev,el,binding);
        })
    },
    update:function (el,binding) {
        el.addEventListener('mousedown',(ev)=>{
            dragX(ev,el,binding);
        })
    }
}