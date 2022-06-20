<template>
  <div class="XTBox" @click="music" :style="{top:position[0],left:position[1]}">
    <audio ref="Click" src="../../../lib/sounds/Feedback.SAO.Click.mp3"></audio>
    
    <div class="xt_left"></div>
    <div class="xt_right"><span>{{username}}</span></div>
    <div class="number_xt">
      <div>{{current}}/{{total}}</div><div>lv.{{level}}</div>
    </div>
    <div class="xt_border">
      <div class="xt_border_left"></div>
      <div class="xt_border_right">
        <div class="tb_line"></div>
        <div class="xt_in"></div>
        <div class="tb_line"></div>
      </div>
    </div>
    <svg height="23px" width="260px" class="svg_border" style="z-index:3">
      <polygon points="0,0 260,0 255,16 124,16 120,23 0,23"
               style="fill:none;stroke:rgb(218,215,215);stroke-width:1;"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "hp",
  props:{
    position:{
      type:Array,
      default(){
        return ["6%","8%"];
      }
    },
    username:{
      type:String,
      default(){
        return 'player'
      }
    },
    current:{
      type:Number,
      default(){
        return '100';
      }
    },
    total:{
      type:Number,
      default(){
        return '100';
      }
    },
    level:{
      type:Number,
      default(){
        return 0;
      }
    }
  },
  methods:{
    changed(val){
      let percent = Math.round(val/this.total*100);
      let xt = document.querySelector('.xt_in');
      xt.style.width = percent + '%';
      if(percent<30){
        xt.classList.remove('xt_in_green');
        xt.classList.add('xt_in_red');
      }else{
        xt.classList.add('xt_in_green');
        xt.classList.remove('xt_in_red');
      }
    },
    music(){
      this.$refs.Click.play();
    }
  },
  watch:{
    current:function (val){
      this.changed(val)
    }
  },
  mounted(){
    this.changed(this.current)
  },
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

.XTBox{
  --bgColor: rgba(205, 221, 248, 0.5);
  --fontcolor: #e1dede;
  --hover: rgba(229, 231, 236, 0.6);
  position: fixed;
  /*top:10%;*/
  /*left:10%;*/
  width:400px;
  height: 40px;
  display: flex;
  filter: drop-shadow(2px 4px 3px rgba(50, 50, 0, 0.5));
  font-family: 'sao','yuanJWD',sans-serif;
  letter-spacing: 1px;
  color: #e1dede;
}

.xt_left,.xt_right,.number_xt{
  height: 100%;
}

.xt_left{
  width: 22px;
  clip-path: polygon(0% 25%,50% 25%,50% 75%,0% 75%,0% 100%,100% 100%,100% 0%,0% 0%);
  margin-right: 3px;
  background: var(--bgColor);
}

.number_xt{
  position: absolute;
  top: 90%;
  left: 60%;
  width: 150px;
  height: 20px;
  display: flex;
}
.number_xt>div{
  background: var(--bgColor);
  box-shadow: -4px 3px 27px 3px rgba(0,0,0,0.1);
  padding-right: 5px;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.number_xt div:nth-child(1){
  width: 69%;
  margin-right: 3px;
}
.number_xt div:nth-child(2){
  width: 30%;
}

.XTBox:hover .xt_left,.XTBox:hover .number_xt div{
  background: var(--hover);
}

/*
总长400px 减去左边+margin 25px 剩下375px 减去左边名字75px 还剩下300px留给血条，血条最好甚至280~300之间
135px的地方开始有个向上缩短高度8px
*/
.xt_right{
  flex:1;
  clip-path: polygon(75px 22%,100% 22%,100% 0%,0% 0%,0 100%,210px 100%, 210px 80%,100% 80%,100% 60%,200px 60%,195px 77%,75px 77%);
  background: linear-gradient(to right,var(--bgColor) 50%,rgba(220, 212, 212, 0));
  display: flex;
  align-items: center;
  padding-left: 8px;
  width: 66px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.XTBox:hover .xt_right{
  background: linear-gradient(to right,var(--hover) 50%,rgba(220, 212, 212, 0));
}
.svg_border{
  position: absolute;
  left: 100px;
  top:9px;
}

.xt_border{
  position: absolute;
  left: 100px;
  top:9px;
  width: 260px;
  height: 23px;
  clip-path:polygon(120px 100%,124px 16px,98% 16px,100% 0%,0% 0%,0% 100%);
  display: flex;
  opacity: .6;
}

.XTBox:hover .xt_border{
  opacity: .8;
}

.xt_border_left{
  width: 1.5px;
  height: 100%;
  background: rgb(218,215,215);
}

.xt_border_right{
  flex: 1;
  height: 100%;
}

.tb_line{
  width: 100%;
  height: 1px;
  background: rgb(218,215,215);
}

.xt_in{
  height: 21px;
  transition: all 1s ease;
}

.xt_in_green{
  background: linear-gradient(to right,rgb(211,234,124),rgb(154,211,52));
}

.xt_in_red{
  background: linear-gradient(to right,rgb(248,140,122),rgb(239,104,78));
}
</style>