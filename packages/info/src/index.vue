<template>
  <div ref="info" class="info" style="display: none;" @click="infoEvent" v-show="visible">
    <ul ref="item_box" class="item_box">
      <li v-for="(item,index) in iconArr" :key="index" :class="item.cl" :ref="item.id" @click.stop="handleEvent(item.fn)">
        <div class="in-circle">
          <i :class="item.class"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "info",
  props:{
    iconArr:{
      type:Array,
      default(){
        return [
          {class:'fa fa-user',id:'user',fn:'userItem',cl:'item'},
          {class:'fa fa-bell-o',id:'bell',fn:'doNothing',cl:'item'},
          {class:'fa fa-comments-o',id:'comments',fn:'doNothing',cl:'item'},
          {class:'fa fa-envelope',id:'envelope',fn:'doNothing',cl:'item'},
          {class:'fa fa-cog',id:'cog',fn:'doNothing',cl:'item'}];
      }
    }
  },
  data(){
    return{
      PositionX:300,
      PositionY:200,
      visible:false,
    }
  },
  methods:{
    handleEvent(methodName){
      this[methodName]();
    },
    userItem(){
      this.iconArr.forEach(item=>{
        if(item.id === 'user'){
          item.cl = 'item active';
        }
      });
      const ul = document.querySelector('ul');
      ul.classList.add('item_box_active');
    },
    doNothing(){
      this.iconArr.forEach(item=>{
        item.cl = 'item'
      });
      const ul = document.querySelector('ul');
      ul.classList.remove('item_box_active');
    },
    infoEvent(){
      this.close()
    },
    init(){
      this.iconArr.forEach(item=>{
        item.cl = 'item';
      })
      this.$refs.item_box.classList.remove('item_box_active');
    },
    close(){
      const info = this.$refs.info;
      let timer = null;
      document.onmousewheel = null;
      timer = setTimeout(()=>{
        timer = null;
        this.visible = false;
      },200)
      info.classList.remove('animated_fadeIn');
      info.classList.add('animated_fadeOut');
    }
  },
  watch:{
    visible:{
      handler:function (val){
        if(val){
          let timer = null;
          timer = setTimeout(()=>{
            timer = null;
            this.iconArr[0].cl = 'item active';
            this.$refs.item_box.classList.add('item_box_active');
          },700)
        }else{
          this.init()
        }
      }
    }
    // iconArr:{
    //   deep:true,
    //   handler:function (val){
    //     const ul = document.querySelector('ul');
    //     ul.classList.add('item_box_active');
    //   }
    // }
  },
  mounted() {
    const that = this;
    document.onmousemove = function (ev) {
      that.PositionX = ev.clientX;
      that.PositionY = ev.clientY;
    }

    document.onkeydown = function(e) {
      const keyCode = e.keyCode || e.which || e.charCode;
      const altKey = e.altKey;

      if(altKey && keyCode === 73) {
        const info = that.$refs.info;

        if(!that.visible){
          that.visible = true;
          info.classList.remove('animated_fadeOut')
          info.classList.add('animated_fadeIn')

          const item_box = that.$refs.item_box;
          item_box.style.left = that.PositionX + 'px';
          item_box.style.top = that.PositionY - 80 + 'px';

          document.onmousewheel = function (e){
            if(e.wheelDelta  > 0){
              let ls = that.iconArr[0]
              that.iconArr.shift();
              that.iconArr.push(ls);
            }else{
              let last = that.iconArr.length - 1
              let ls = that.iconArr[last]
              that.iconArr.pop();
              that.iconArr.unshift(ls);
            }
          }
        }else{
          that.close();
        }
      }
      //都是阻止默认行为，一个W3C标准，一个IE标准，不过IE死了（好似）
      // e.preventDefault();
      // return false;
    }
  }
}
</script>

<style scoped>
@import url(./info.css);
</style>