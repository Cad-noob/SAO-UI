<template>
  <div class="waifu" @touchstart="start" @touchmove="move">
    <div class="waifu-tips"></div>
    <canvas id="live2d" class="live2d"></canvas>
            <div class="waifu-tool">
            <span class="fui-home"></span>
            <span class="fui-chat"></span>
            <span class="fui-eye"></span>
            <span class="fui-user"></span>
            <span class="fui-photo"></span>
            <span class="fui-info-circle"></span>
            <span class="fui-cross"></span>
        </div>
  </div>
</template>

<script>
import {initModel} from "../../../lib/live2d/waifu-tips.js";
import "../../../lib/live2d/live2d.js";
import "../../../lib/live2d/waifu.css";

export default {
  name: "live2d",
  props:{
    TexturesId:{
      type:Number,
      default(){
        return 1;
      }
    },
    Hitokoto:{
      type:Boolean,
      default() {
        return false;
      }
    },
    Json:{
      type:String,
      default(){
        return 'https://www.yamapink.com/sao-ui/waifu-tips.json'
      }
    },
    EdgeSide:{
      type:Number,
      default(){
        return 80
      }
    }
  },
  data(){
    return{
      startX:0,
      domStartX:0,
      domTop:0,
    }
  },
  methods:{
    //移动端的拖拽
    start(){
      const e = event||window.event;
      this.startX = e.touches[0].pageX;
      this.domStartX = document.querySelector(".waifu").offsetLeft;
      this.domTop = document.querySelector(".waifu").offsetTop;
    },
    move(){
      const e = event||window.event;
      let dom = document.querySelector(".waifu");
      let distance = e.touches[0].pageX - this.startX;
      dom.style.left = this.domStartX + distance + 'px';
      dom.style.top = this.domTop + 'px';
    }
  },
  mounted() {
    const width = document.documentElement.clientWidth;
    if(width < 992 && width > 768){
      live2d_settings['waifuEdgeSide'] = `leftPercent:${this.EdgeSide-10}}`;
    }else{
      live2d_settings['waifuEdgeSide'] = `leftPercent:${this.EdgeSide}`;    // 看板娘水平位置
    }

    /* 可直接修改部分参数 */
    live2d_settings['modelAPI'] = 'https://www.yamapink.com/';
    live2d_settings['modelId'] = 1;                  // 默认模型 ID
    live2d_settings['modelTexturesId'] = this.TexturesId;         // 默认材质 ID
    live2d_settings['modelStorage'] = false;         // 不储存模型 ID
    live2d_settings['waifuSize'] = '280x500';        // 看板娘大小
    live2d_settings['waifuTipsSize'] = '230x100';    // 提示框大小
    live2d_settings['waifuFontSize'] = '16px';       // 提示框字体
    live2d_settings['waifuToolTop'] = '-40px';       // 工具栏顶部边距
    live2d_settings['waifuDraggable'] = 'axis-x';    // 拖拽样式
    live2d_settings['showToolMenu'] = false;         // 关闭菜单栏
    live2d_settings['waifuDraggableRevert'] = false;  // 拖拽还原
    live2d_settings['showHitokoto'] = this.Hitokoto;
    live2d_settings['hitokotoAPI'] = 'hitokoto.cn';  // 一言 API，可选 'lwl12.com', 'hitokoto.cn', 'jinrishici.com'(古诗词)
    /* 在 initModel 前添加 */
    initModel(this.Json)
    $("#live2d").attr("height","400");
  }
}
</script>

<style scoped>
</style>