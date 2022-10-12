<template>
  <div class="info" v-show="visible" @click.self="close" ref="info">
    <audio ref="Popup" src="../../../lib/sounds/Popup.SAO.Launcher.mp3"></audio>
    <audio ref="Dismiss" src="../../../lib/sounds/Dismiss.SAO.Launcher.mp3"></audio>

    <div class="curved" ref="curved" @click.self="close">
      <div data-depth="0.2">
        <div ref="position" class="position">
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Parallax from 'parallax-js'

export default {
  name: "pop-up-menu",
  props:{
    keyCode:{
      type:Number,
      default(){
        return 65;
      }
    },
    slideDown:{
      type:Boolean,
      default() {
        return true;
      }
    },
    curved:{
      type:Boolean,
      default(){
        return true;
      }
    },
    //下滑激活所需要的移动高度差
    slideDownY:{
      type:Number,
      default(){
        return 250;
      }
    },
    //下滑激活的时间范围
    activeDuration:{
      type:Number,
      default(){
        return 666;
      }
    }
  },
  data(){
    return{
      visible:false,
      PositionX:300,//默认的窗口横坐标
      PositionY:200,//同上，纵坐标
      startClose:false,//开始执行消失之前的操作
      delay:500,//500毫秒消失，动画显示
      timer:null,//模仿节流所设置的变量
      JL_Duration:2000, //节流wait时间
      // percent:0,//预期用来做偏移量的百分比，效果不理想搁置中
      maxOffSetX: 70,//X轴最大偏移量
      XMiddle: 25,//便宜到快中心的位置的距离
      Xbj:270,//X坐标边界
      maxOffsetY:50,//浮动的偏移变量最大值
      initOffsetY:50,//固定偏移量
      Ybj:240,//Y轴上边界
      UlHeight:340,//菜单栏盒子高度
      flagX:null,//判断鼠标在中心Y轴的左边还是右边
      firstY:0,
      firstTime:null,
      maxDegree:6,
    }
  },
  methods:{
    //关闭信息窗口
    close(){
      if(!this.timer){ //节流
        this.timer = setTimeout(()=>{
          this.timer = null;
        },this.JL_Duration)

        this.$refs.Dismiss.play();
        this.startClose = true;

        const info = this.$refs.info;
        const position = this.$refs.position;

        info.classList.remove('animated_fadeIn');
        info.classList.add('animated_fadeOut');
        position.classList.add('animated_moveLeft');

        //延迟是为了动画效果显示
        let timer = setTimeout(()=>{
          this.visible = false;
          this.startClose = false;
          position.classList.remove('animated_moveLeft');
          info.classList.remove('animated_fadeOut');
        },this.delay)
        this.$once('hook:beforeDestroy',()=>{
          clearTimeout(timer);
          timer = null;
        })
      }
    },
    //打开信息窗口
    open(X,Y){
      if(!this.timer){
        this.timer = setTimeout(()=>{
          this.timer = null;
        },this.JL_Duration)

        this.$refs.Popup.play();
        const info = this.$refs.info;
        const position = this.$refs.position;
        const curved = this.$refs.curved

        this.visible = true;
        info.classList.add('animated_fadeIn');

        //鼠标位于X轴边界外时，固定在算法中的边缘。
        //鼠标位于X轴边界内时，根据中心左右两边进行一定的偏移
        if(X <= this.Xbj){
          let percent = 1;
          position.style.left = this.Xbj + this.maxOffSetX + 'px';
          if(this.curved){
            let offsetD = percent * this.maxDegree;
            curved.style.transform = `translate(20px,15px) rotateY(${offsetD}deg)`;
          }
        }else if(X > this.Xbj && X <= window.innerWidth/2){
          let percent = (window.innerWidth/2 -X)/(window.innerWidth/2 - this.Xbj);
          let offset = percent * this.maxOffSetX;
          position.style.left = X - this.XMiddle + offset + 'px';
          if(this.curved){
            let offsetD = percent * this.maxDegree;
            curved.style.transform = `rotateY(${offsetD}deg)`;
          }
        }else if(X > window.innerWidth/2 && X < window.innerWidth - this.Xbj){
          let percent = (X-window.innerWidth/2)/(window.innerWidth/2 - this.Xbj);
          let offset = percent * this.maxOffSetX;
          position.style.left = X- this.XMiddle - offset + 'px';
          if(this.curved){
            let offsetD = percent * (0 - this.maxDegree);
            curved.style.transform = `rotateY(${offsetD}deg)`;
          }
        }else if(X >= window.innerWidth - this.Xbj) {
          let percent = 1;
          position.style.left = window.innerWidth - this.Xbj - this.maxOffSetX + 'px';
          if(this.curved){
            let offsetD = percent * (0 - this.maxDegree);
            curved.style.transform = `translate(40px) rotateY(${offsetD}deg)`;
          }
        }

        //Y轴在上边界处外，固定在Y轴下方,为了让
        if(Y <= this.Ybj){
          position.style.top = this.Ybj - this.initOffsetY + 'px';
        }else if(Y > this.Ybj && Y <= window.innerHeight - this.UlHeight + this.maxOffsetY + this.initOffsetY){
          let offset = (Y - this.Ybj)/(window.innerHeight - this.UlHeight -this.Ybj)*this.maxOffsetY;
          position.style.top = Y - offset - this.initOffsetY + 'px';
        } else if(Y > window.innerHeight - this.UlHeight + this.maxOffsetY + this.initOffsetY){
          position.style.top = window.innerHeight - this.UlHeight + 'px';
        }

      }
    },
    //按下组合键触发打开或者关闭
    keyDownHandle(e){
      const keyCode = e.keyCode || e.which || e.charCode;
      const altKey = e.altKey;

      if(altKey && keyCode === this.keyCode && !this.visible) {
        this.open(this.PositionX,this.PositionY);
      }
      else{
        this.close();
      }

      //都是阻止默认行为，一个W3C标准，一个IE标准，不过IE死了（好似）
      //  e.preventDefault();
      //  return false;
    },
    //鼠标先下滑动200px且在1秒之内才能触发打开菜单
    downMove(e){
      let secondY = e.clientY;
      let secondTime = new Date();

      if(secondY - this.firstY > this.slideDownY && secondTime.getTime() - this.firstTime.getTime() < this.activeDuration && !this.timer && !this.visible){
        this.open(this.PositionX,this.firstY);
      }
    },
  },
  watch:{
    closeBar:{
      handler:function (val){
        if(val){
          this.close();
        }
      }
    }
  },
  mounted: function () {
    const that = this;
    //实时获取鼠标坐标
    document.addEventListener('mousemove', (ev) => {
      that.PositionX = ev.clientX;
      that.PositionY = ev.clientY;
    })

    //alt+keycode弹出信息框，并且是跟随鼠标的位置移动而改变显示成位置
    document.addEventListener('keydown', that.keyDownHandle)

    // document.addEventListener('mousedown', that.downMove)
    //设置鼠标可以向下滑动生成菜单
    if(this.slideDown){
      document.addEventListener('mousedown', (ev)=>{
        that.firstY = ev.clientY;
        that.firstTime = new Date();

        document.addEventListener('mousemove',that.downMove)
        document.addEventListener('mouseup',()=>{
          document.removeEventListener('mousemove',that.downMove)
        })
      })
    }

    //设置Parallax参数，鼠标移动让DOM跟随移动
    const parallaxInstance = new Parallax(this.$refs.curved, {
      relativeInput: true,
    });
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'sao';
  src:url('../../../lib/fonts/SAOUI.ttf');
}

@font-face {
  font-family: 'yuanJWD';
  src:url('../../../lib/fonts/ZhuZiAYuanJWD.ttf');
}

.info{
  position: fixed;
  z-index: 400;
  left:0;
  top:0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  font-family: 'sao','yuanJWD',sans-serif;
  /*pointer-events: auto!important;*/
  perspective: 600px;
}
/*因为使用了Parallax插件，所以point-events被迫发生了改变这里强制改一下*/
.curved{
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: auto!important;
  /*transform: translateX(20px) rotateY(6deg)!important;*/
}

.position{
  position: absolute;
  animation: breath 8s linear infinite;
  animation-delay: .2s;
}

.animated_fadeIn{
  animation: fadeIn .4s ease forwards;
}
.animated_fadeOut{
  animation: fadeOut .5s ease forwards;
}
.animated_moveLeft{
  animation: moveLeft .4s ease;
}

@keyframes fadeIn {
  from {
    /*background: rgba(0,0,0,0);*/
    /*backdrop-filter: blur(0px);*/
    opacity: 0;
  }

  to {
    opacity: 1;
    /*background: rgba(0, 0, 0, 0.7);*/
    /*backdrop-filter: blur(2px);*/
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    /*background: rgba(0,0,0,.7);*/
    /*backdrop-filter: blur(2px);*/
  }

  to {
    opacity: 0;
    /*background: rgba(0,0,0,0);*/
    /*backdrop-filter: blur(0px);*/
  }
}

@keyframes breath {
  0%{
    transform: translate(0);
  }
  25%{
    transform: translate(0,8px);
  }
  50%{
    transform: translate(-8px,0);
  }
  75%{
    transform: translate(-8px,8px);
  }
  100%{
    transform: translate(0);
  }
}

@keyframes moveLeft {
  from{
    transform: translateX(0);
  }
  to{
    transform: translateX(-300px);
  }
}
</style>