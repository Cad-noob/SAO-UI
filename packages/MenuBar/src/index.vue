<template>
  <div>
    <audio ref="Click" src="../../../lib/sounds/Feedback.SAO.Click.mp3"></audio>
    <ul ref="item_box" class="item_box" :class="[active?'item_box_active':'']">
      <li v-for="(item,index) in liArr" :key="index" class="item" :class="[startClose?'animated_up':'animated_down']"
      @click="activeFn(item,index)">
        <div class="in-circle">
          <i v-if="item.iClass" :class="item.iClass"></i>
          <!--        <img v-if="!item.iClass" :src="liArr.src" :class="item.class" alt=""> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "menu-bar",
  props:{
    iconArr:{
      type:Array,
    },
    imgArr:{
      type:Array,
    },
    infoActive:{
      type:String,
      default(){
        return 'userInfo';
      }
    }
  },
  data(){
    return{
      active:false,
      liArr: [],
      activeDelay:650,
      timer:null,
      activeItem:null,
      JL_Duration:1000,//节流的持续时间
      speed:40,//数组切换排序上升速度
    }
  },
  computed:{
    visible:function (){
      return this.$parent.$data.visible;
    },
    startClose:function (){
      return this.$parent.$data.startClose;
    }
  },
  methods:{
    //激活
    //首先只有点击用户信息左侧栏目才会打开
    //如果可以被激活,1.非激活状态下激活可以被激活 2.激活状态下激活别的可被激活
    //如果不可以被激活
    activeFn(item,i){
      //节流
      if(!this.timer){
        this.timer = setTimeout(()=>{
          this.timer = null;
        },this.JL_Duration);
        //播放音乐
        this.$refs.Click.play();
        //如果点击重复的可激活按钮，就撤销激活状态
        //点击可激活的不重复按钮，撤销原来的激活按钮的状态，其他保持不变
        let lis = document.querySelectorAll('.item');
        if(item.canActive){
          if(item.name === this.activeItem){
            this.active = !this.active;
            lis[i].classList.toggle('active');
          }else{
            this.active = true;
            let timer = null;
            this.activeItem = item.name;
            lis[0].classList.add('active');

            //激活就得置顶
            for(let a = 0;a < i;a++){
              timer = setTimeout(()=>{
                this.liArr.push(this.liArr[0]);
                this.liArr.shift();
              },this.speed*a)
            }
            this.$once('hook:beforeDestroy',()=>{
              clearTimeout(timer);
            })
          }
          //给子菜单传递数据
          if(this.active){
            this.$EventBus.$emit('activeChild',{active:true,name:item.name})
          }else{
            this.$EventBus.$emit('activeChild',{active:false,name:null})
          }

        }else{
          //点击不可激活的按钮，激活状态为否，激活的按钮也不再赋值
          this.active = false;
          this.activeItem = null;
          lis[0].classList.remove('active');
          this.$EventBus.$emit('activeChild',{active:false,name:null});
        }

        //如果点击到了用户信息，左侧打开
        if(this.activeItem === this.infoActive){
          this.$EventBus.$emit('activeMsg',this.active);
        }else{
          this.$EventBus.$emit('activeMsg',false);
        }

      }
    },
    //初始化
    init(){
      this.liArr = JSON.parse(JSON.stringify(this.iconArr));
      // this.activeItem = this.iconArr[0].name;
      let timer = null;

      //延迟激活
      timer = setTimeout(()=>{
        this.activeFn(this.iconArr[0],0);
        // this.active = true;
        // document.querySelector('li').classList.add('active');
        // this.$EventBus.$emit('activeMsg',this.active);
      },this.activeDelay)
      this.$once('hook:beforeDestroy',()=>{
        clearTimeout(timer)
      })
    },
    mouseWheelHandle(e){
      let X = this.$parent.$refs.position.offsetLeft;
      let Y = this.$parent.$refs.position.offsetTop;
      let PositionX = this.$parent.$data.PositionX;
      let PositionY = this.$parent.$data.PositionY;
      let last = this.liArr.length - 1;
      //到指定区域才能滑动
      if( (PositionX > X && PositionX < X+55) && (PositionY > Y && PositionY < Y+350) ){
        let timer = null;
        this.$once('hook:beforeDestroy',()=>{
          clearTimeout(timer)
        })

        //滚动后左侧消失且激活也消失
        if(this.active){
          let lis = document.querySelectorAll('.item');
          this.$EventBus.$emit('activeMsg',false);
          this.$EventBus.$emit('activeChild',{active:false,name:null});
          this.activeItem = null;
          this.active = false;
          lis.forEach(item=>{
            if(item.classList.contains('active')){
              item.classList.remove('active');
            }
          })
        }

        //向上滑动
        if(e.wheelDelta  > 0){
          this.liArr.unshift(this.liArr[last]);
          this.liArr.pop();
          timer = setTimeout(()=>{
            this.liArr.unshift(this.liArr[last]);
            this.liArr.pop();
          },100)

        }else{
          //向下滑动
          this.liArr.push(this.liArr[0])
          this.liArr.shift();
          timer = setTimeout(()=>{
            this.liArr.push(this.liArr[0])
            this.liArr.shift();
          },100)

        }
      }
    },
  },
  watch:{
    visible:{
      handler:function (val){
        if(val){
          this.init();
          addEventListener('mousewheel',this.mouseWheelHandle);
        }else{
          this.active = false;
          this.liArr = JSON.parse(JSON.stringify(this.iconArr));
          removeEventListener('mousewheel',this.mouseWheelHandle);
        }
      }
    },
  },
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.item_box{
  height: 340px;
  overflow: hidden;
  position: absolute;
}

.item_box_active{
  -webkit-mask: -webkit-gradient(linear,0% 0%,0% 100%,from(rgba(222,187,71,1)),to(rgba(36,142,36,.3)));
}

.item_box li:nth-child(5){
  animation-delay: 0s;
}
.item_box li:nth-child(4){
  animation-delay: .05s;
}
.item_box li:nth-child(3){
  animation-delay: .1s;
}
.item_box li:nth-child(2){
  animation-delay: .15s;
}
.item_box li:nth-child(1){
  animation-delay: .2s;
}

.item{
  margin-bottom: 15px;
  --radius:54px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid rgba(201, 198, 198,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top:-500px;
}

.animated_down{
  animation: itemDown .4s ease forwards;
}

.animated_up{
  animation: itemUp .4s ease forwards;
}

@keyframes itemDown {
  from{
    top:-500px;
  }
  to{
    top:0;
  }
}

@keyframes itemUp {
  from{
    top:0;
  }
  to{
    top:-500px;
  }
}

.item .in-circle{
  width: calc(var(--radius) - 8px);
  height: calc(var(--radius) - 8px);
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  display: flex;
  align-items: center;
  justify-content: center;
}

.item .in-circle i{
  font-size: 26px;
  color: rgb(185, 183, 183);
}

.active{
  border:2px solid rgba(243, 175, 18, 0.6)!important;
}

.active .in-circle {
  background: rgba(243, 175, 18, 0.8)!important;
}

.active .in-circle i {
  color:rgba(255,255,255,.9)!important;
}

.item:hover .in-circle{
  background: rgba(243, 175, 18, 0.8);
}

.item:hover .in-circle i{
  color:rgba(255,255,255,.9);
}

.item:hover{
  border:2px solid rgba(243, 175, 18, 0.6);
}
</style>