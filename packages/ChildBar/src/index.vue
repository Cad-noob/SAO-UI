<template>
  <div ref="cb" class="cb_position">
    <audio ref="Menu" src="../../../lib/sounds/Popup.SAO.Menu.mp3"></audio>

    <div ref="line" class="line" :class="[active?'show':'']"></div>
    <div ref="arrow" class="arrow" :class="[active?'show':'']">
      <div class="circle"></div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "child-bar",
  data(){
    return{
      height:43,//单位item高度
      active:false,
      name:null,
      MaxDegree:10,//最大偏移角度
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
    changLine(){
      //切换到能激活的就要改变子菜单
      let length = document.querySelectorAll(`#${this.name} li`).length;
      //6是比整个MENUBAR小6PX，再减去3是指最后一个元素的margin-bottom 3px减掉
      this.$refs.line.style.height = this.height * length - 6 - 3 + 'px';
    },
    play(){
      let timer = null
      timer = setTimeout(()=>{
        this.$refs.Menu.play();
      },400);
    }
  },
  watch:{
    //情况1：一开始一定oname是null遇到激活，直接执行所有动画就好
    //情况2：如果处于已经激活的状态,再次点击自身则会消失
    //情况3：如果再次点击可激活按钮，则重复情况1
    //情况4：如果处于激活状态，点击到了还可以被激活的按钮，则箭头动画不要变，只变动ul的动画
    //情况5：如果处于激活状态，点击到了不可被激活的按钮重复情况2
    name:{
      handler:function (n,o){
        this.changLine();
        if(o===null && n!==null){//情况1
          this.play();
          let nDom = document.querySelector(`#${n}`);
          nDom.classList.remove('ulNotActive');
          nDom.classList.add('ulActive');
        }else if(n===null && o!==null){//情况2
          let oDom = document.querySelector(`#${o}`);
          oDom.classList.remove('ulActive');
          oDom.classList.add('ulNotActive');
        }else if(n!==null && o!==null){
          this.play();
          let nDom = document.querySelector(`#${n}`);
          let oDom = document.querySelector(`#${o}`);
          oDom.classList.remove('ulActive');
          oDom.classList.add('ulNotActive');
          nDom.classList.remove('ulNotActive');
          nDom.classList.add('ulActive');
        }
      }
    },
    visible:{
      handler:function (val){
        if(!val){
          this.active = false;
          let uls = document.querySelectorAll('.cb_position ul');
          uls.forEach(item=>{
            if(item.classList.contains('ulNotActive')){
              item.classList.remove('ulNotActive');
            }
          });
        }
      }
    },
    startClose:{
      handler:function (){
        this.name = null;
      }
    }
  },
  mounted(){
    this.$EventBus.$on('activeChild',data=>{
      this.active = data.active;
      this.name = data.name;
    })
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/*.perspective{*/
/*  perspective: 300px;*/
/*}*/

.cb_position{
  position: absolute;
  left:86px;
  top:27px;
}

.cb_position > ul{
  position: absolute;
  transform: translateY(-50%);
  top:-100px;
  opacity: 0;
}

.ulActive{
  animation:down .25s ease forwards;
  animation-delay: .25s;
}

.ulNotActive{
  animation:up .25s ease forwards;
}

@keyframes down {
  0%{
    top:-100px;
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    top:0;
    opacity: 1;
  }
}

@keyframes up {
  0%{
    top:0;
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    top:-100px;
    opacity: 0;
  }
}

.cb_position > ul > li{
  height: 40px;
  margin-bottom: 3px;
  width: 130px;
  list-style: none;
  background: rgba(255, 255, 255, .85);
  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: left;
  cursor: default;
}

.cb_position > ul > li:last-child{
  margin-bottom: 0;
}

.cb_position > ul > li i{
  margin: 0 10px;
}

.cb_position > ul > li:hover{
  background: rgb(222,166,32);
  color:rgb(251,245,231);
}

.cb_position > ul > li span{
  display: inline-block;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.arrow{
  opacity: 0;
  position: absolute;
  left:-22px;
  width: 19px;
  height: 17px;
  overflow: hidden;
  transform: translateY(-50%);
  clip-path: polygon(0 50%,100% 100%,100% 0);
}

.circle{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(34%,-50%);
  box-shadow: 0px 0px 0px 100px rgb(212,212,212);
}

.line{
  opacity: 0;
  width: 2px;
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  background: linear-gradient(transparent,rgb(124,124,124) 15%,rgb(124,124,124) 85%,transparent);
}

.arrow,.line{
  transition:opacity .2s ease;
}

.show{
  opacity: 1;
}
</style>