<template>
  <div ref="saoAlert" class="saoMsgBox_fa" v-show="visible">

    <audio ref="Alert" src="../../../lib/sounds/Popup.SAO.Alert.mp3"></audio>
    <audio ref="Dismiss" src="../../../lib/sounds/Dismiss.SAO.Message.mp3"></audio>
    <audio ref="Click" src="../../../lib/sounds/Feedback.SAO.Click.mp3"></audio>

    <div class="saoMsgBox">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div>
        <span><slot></slot></span>
      </div>
      <div>
        <div v-if="icon" class="ok" @click="okEvent">
          <div class="in_ok"></div>
        </div>
        <div v-if="icon" class="close" @click="CloseAlert">
          <div class="in_close"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sao-alert",
  props:{
    title:{
      type:String,
      default(){
        return 'Message'
      },
    },
    icon:{
      type:Boolean,
      default: true,
    },
    visible:{
      type:Boolean,
      default(){
        return false
      },
    }
  },
  data(){
    return{
      delayCloseDuration:600,//延迟关闭时间，方便动画执行完毕
    }
  },
  methods:{
    CloseAlert(){
      this.$refs.saoAlert.classList.add('Close');
      this.closePlay();
      let timer = null;
      timer = setTimeout(()=>{
        this.$emit('update:visible',false);
        this.$refs.saoAlert.classList.remove('Close');
        timer = null;
      },this.delayCloseDuration)

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
    okEvent(){
      this.$emit('ok');
      this.CloseAlert();
    },
    closePlay(){
      this.$refs.Dismiss.play();
      this.$refs.Click.play();
    },
    openPlay(){
      this.$refs.Alert.play();
    }
  },
  watch:{
    visible:function (val){
      if(val){
        this.openPlay();
      }
    }
  },
  mounted() {
    // if(this.visible){
    //   this.openPlay();
    // }
    if(!this.icon){
      this.$refs.saoAlert.addEventListener('click',this.CloseAlert);
    }
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

.saoMsgBox_fa{
  --fa-duration:1s;/*控制整个最外层边框的padding变化的动画时间*/
  --close-duration:.5s;/*关闭alert动画时间*/
  --open-duraton: .5s;/*每个打开动画动画时间*/
  /*动画时间最好都别动，否则效果大打折扣*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  animation: paddingOpen ease var(--fa-duration);
  animation-fill-mode: forwards;
}

@keyframes paddingOpen  {
  0%{
    padding: 38px 120px;
  }
  53%{
    padding: 38px 0;
  }
  100%{
    padding:0;
  }
}

.Close{
  animation: paddingClose ease var(--close-duration);
  animation-fill-mode: forwards;
}

@keyframes paddingClose{
  0%{
    padding:0;
  }
  100%{
    padding:0 187px;
  }
}

.saoMsgBox{
  width: 375px;
  box-shadow: 0px 0px 32px 4px rgba(0,0,0,0.3);
  border-radius: 2px;
  animation: XOpen ease var(--open-duraton);
  animation-fill-mode: forwards;
}

@keyframes XOpen {
  0%{
    width: 135px;
  }
  100%{
    width: 375px;
  }
}

.Close .saoMsgBox{
  animation: XClose ease var(--close-duration);
  animation-fill-mode: forwards;
}

@keyframes XClose {
  0%{
    width: 375px;
    opacity: 1;
  }
  100%{
    width: 0;
    opacity: 0;
  }
}

.saoMsgBox>div:nth-child(1){
  height: 68px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:  rgba(0,0,0,.3) 0 13px 12px 0, rgba(0 ,0 ,0, .1) 0 13px 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.title span{
  --slice1:inset(0 50% 0 50%);
  --slice2:inset(0 0 0 0);
  font-family: 'sao', sans-serif;
  letter-spacing: 1px;
  font-weight: 800;
  color:rgb(100,99,100);
  font-size: 18px;
  animation: appear ease var(--open-duraton);
  animation-fill-mode: forwards;
  text-align: center;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.saoMsgBox>div:nth-child(3){
  height: 83px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:  rgba(0,0,0,.07) 0 -15px 12px 0, rgba(0 ,0 ,0, .1) 0 -2px 15px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.close,.ok{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

.close{
  --close:rgb(209,61,79);
  border:3px solid var(--close);
}

.ok{
  --ok:rgb(66,140,230);
  border:3px solid var(--ok);
}
.in_close,.in_ok{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.in_close{
  background: var(--close);
}

.in_close::before{
  content:"";
  width: 20px;
  height: 5px;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(45deg);
}

.in_close::after{
  content:"";
  width: 20px;
  height: 5px;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(-45deg);
}

.in_ok{
  background: var(--ok);
}

.in_ok::before{
  content:"";
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.in_ok::after{
  content:"";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--ok);
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.saoMsgBox>div:nth-child(2){
  height: 25px;
  background: rgba(234, 233, 233, 0.7);
  animation: YOpen ease var(--open-duraton);
  animation-delay: .4s;
  animation-fill-mode: forwards;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes YOpen {
  0%,30%{
    height: 25px;
  }
  100%{
    opacity: 1;
    height: 101px;
  }
}

.saoMsgBox>div:nth-child(2) span{
  --slice1:inset(50% 0 50% 0);
  --slice2:inset(0 0 0 0);
  clip-path:inset(50% 0 50% 0);
  font-family: 'yuanJWD', sans-serif;
  font-weight: 400;
  font-size: 23px;
  color: rgb(100, 96, 96);
  animation: appear ease .35s;
  animation-delay: .6s;
  animation-fill-mode: forwards;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.Close .saoMsgBox>div:nth-child(2) span,.Close .title span{
  --slice1:inset(0 50% 0 50%);
  --slice2:inset(0 0 0 0);
  animation: disappear ease var(--close-duration);
  animation-fill-mode: forwards;
}

@keyframes appear {
  0%{
    clip-path: var(--slice1);
  }
  100%{
    clip-path: var(--slice2);
  }
}
@keyframes disappear {
  0%{
    clip-path: var(--slice2);
  }
  100%{
    clip-path: var(--slice1);
  }
}
</style>