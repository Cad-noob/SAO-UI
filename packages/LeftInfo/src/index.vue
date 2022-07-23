<template>
  <div class="leftInfo">
    <audio ref="Panel" src="../../../lib/sounds/Popup.SAO.Panel.mp3"></audio>
    <div class="leftInfoBox" ref="infoBox" :class="[active?'animated_paddingOpen':'animated_close TM']">
      <div class="top" ref="top" :class="[active?'animated_topOpen':'top_notActive']">
        <i class="right-triangle"></i>
        <div class="title">
          {{username}}
        </div>
        <slot></slot>
      </div>
      <div class="bottom" ref="bottom" :class="[active?'animated_bottomOpen':'bottom_notActive']">
        <i class="bottom-triangle"></i>
        <div class="des" :class="[active?'debug':'']">
          {{des}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "left-info",
  props:{
    username:{
      type:String,
      default(){
        return 'player'
      }
    },
    // avatar:{
    //   type:String,
    // },
    des:{
      type:String,
      default() {
        return "Welcome to SAO world";
      }
    }
  },
  data(){
    return{
      active:false,
      MaxDegree:10,//最大偏移角度
    }
  },
  computed:{
    visible:function (){
      return this.$parent.$data.visible;
    },
  },
  watch:{
    visible:{
      handler:function (val){
        //不加这个每次组合键打开窗口，就会弹出离开动画,这个是为了解决打开窗口后，窗口未激活就直接执行非active动画出现的BUG
        //一般情况是有了激活后，才能执行非激活动画，从激活变成非激活
        //其实这些bug也和我初期的设计考虑不周有关，以后再想改吧
        if(val){
          this.$refs.infoBox.classList.remove('animated_close');
          this.$refs.top.classList.remove('top_notActive');
          this.$refs.bottom.classList.remove('bottom_notActive');

          //这里本来想想加旋转偏移量，不太理想，以后再说
          // let offset = this.$parent.$data.percent * this.MaxDegree;
          // if(this.$parent.$data.flagX === 'left'){
          //   this.$refs.infoBox.style.transform = `rotateY(${offset}deg)`;
          // }else{
          //   let rOffset = offset - 5 < 0 ? 0 : offset - 5;
          //   this.$refs.infoBox.style.transform = `rotateY(-${rOffset}deg)`;
          // }
        }else{
          this.active =false;
        }
      }
    }
  },
  mounted() {
    this.$EventBus.$on('activeMsg',data=>{
      this.active = data;

      if(data){
        let timer = null;
        timer = setTimeout(()=>{
          this.$refs.Panel.play();
        },200)
        this.$once('hook:beforeDestroy',()=>{
          clearTimeout(timer)
        })
      }

    });
  }

}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.leftInfo{
  position: absolute;
  left: calc(-25px - 240px);
  top:-180px;
  /*perspective: 600px;*/
}

/*透明，因为一打开窗口的非激活状态删掉了消失动画，所以会有显示，必须加透明*/
.TM{
  opacity: 0;
}

.leftInfoBox .top{
  background: rgba(255, 255, 255, .85);
}

.top .title{
  margin: 0 10px;
  padding-top: 10px;
  padding-bottom: 7px;
  border-bottom: 2px solid rgb(170,170,170);
  letter-spacing: 1px;
  text-align: center;
}

.right-triangle{
  width: 18px;
  height: 14px;
  position: absolute;
  top:200px;
  left: 100%;
  clip-path: polygon(100% 50%,0 100%,0 0);
  background: rgba(255, 255, 255, .9);
}

.bottom-triangle{
  width: 15px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 30px;
  clip-path: polygon(50% 100%,100% 0,0 0);
  background: rgba(255, 255, 255, .75);
}

.top_notActive{
  width: 240px;
  height: 252px;
}

.leftInfoBox .bottom{
  background: rgba(229, 227, 227, 0.8);
  height: 0;
  position: relative;
  overflow: hidden;
}

.bottom .des{
  width: 0;
  text-align: left;
}

.debug{
  animation: forTriangleDebug .01s ease forwards;
  animation-delay: .5s;
}

@keyframes forTriangleDebug {
  from{
    width: 0;
    padding: 0;
  }
  to{
    width: 240px;
    padding: 15px 10px;
  }
}

.bottom_notActive{
  height: 168px;
  width: 240px;
}

.animated_paddingOpen{
  animation: padding_open 1s ease forwards;
}
.animated_topOpen{
  animation: top_open .5s ease forwards;
}
.animated_bottomOpen{
  animation: bottom_open .5s ease forwards;
  animation-delay: .5s;
}
.animated_close{
  animation: close .2s ease forwards;
}


@keyframes padding_open {
  0%{
    padding-left: 240px;
    padding-top: 252px;
    padding-bottom: 168px;
    opacity: 0;
  }
  50%{
    padding-left: 0;
    padding-top: 0;
    opacity: 1;
  }
  100%{
    padding-bottom: 0;
  }
}

@keyframes close{
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}

@keyframes top_open {
  from{
    width: 0;
    height: 0;
  }
  to{
    width: 240px;
    height: 252px;
  }
}

@keyframes bottom_open {
  from{
    height: 0;
    padding: 0;
  }
  5%{
    /*opacity: 1;*/
  }
  to{
    height: 168px;
    /*opacity: 1;*/
  }
}
</style>