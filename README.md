## 这是一个SAO-UI TEST版本

基于`Vue2`的UI组件库，模仿了Sao Utils，之后有时间的话我会发布更好更完善的SAO-UI

设计的不是很完美，需要你有一定的Vue基础

暂时先写了俩个小组件，正式版本还有待慢慢完善，总之先写起来

## 安装&引用

安装：

```
npm i sao-ui-test
```

全局引用

```
//main.js
import sao from 'sao-ui-test'
```

## 音频文件

关于这个，我暂时是想让大家随意使用自己想要的音频文件，所以并没有写死，当然也可以直接用我的。

我都放在了我的博客上引用链接就可以，详情使用看用法举例

## alert框

模仿了Sao Utils的对话框，做了很多的动画效果

标签：`<sao-alert></sao-alert>`

### 用法举例

```
<template>
  <div>
    <button @click="Alert">open</button>
    <sao-alert :icon="true" @open="play2" @ok="test" @close="play1" :visible.sync="AlertVisible">
      {{msg}}
    </sao-alert>

    <audio ref="DisMiss">
      <source src="https://www.yamapink.com/sao-ui/sounds/Dismiss.SAO.Message.mp3" type="audio/mp3">
    </audio>
    <audio ref="Alert">
      <source src="https://www.yamapink.com/sao-ui/sounds/Popup.SAO.Alert.mp3" type="audio/mp3">
    </audio>

  </div>
</template>
<script>
export default {
  data(){
    return{
      msg:"Sao Link Complete",
      AlertVisible:false,
    }
  },
  methods:{
    test(){
      console.log("test")
    },
    play1(){
      this.$refs.DisMiss.play();
    },
    play2(){
      this.$refs.Alert.play();
    },
    Alert(){
      this.AlertVisible = true;
    }
  },
}
</script>
```

### Attributes

| 参数    | 说明                                        | 类型    | 可选值 | 默认值  |
| ------- | ------------------------------------------- | ------- | ------ | :------ |
| visible | 是否显示 弹出框，支持 .sync 修饰符          | Boolean | —      | false   |
| title   | 弹出框的标题                                | String  | —      | Message |
| icon    | 是否显示底部开关,不显示点击对话框就可以关闭 | Boolean | —      | false   |

### Slot

| name | 说明                                   |
| ---- | -------------------------------------- |
| —    | 直接在标签里输入即可，弹出框中间的内容 |

### Events

| 事件名称 | 说明                                           | 回调函数 |
| -------- | ---------------------------------------------- | -------- |
| ok       | 当显示底部开关后，点击蓝色按钮的回调           | —        |
| close    | 关闭时的回调，我的设想现在只是用来播放关闭音效 | —        |
| open     | 打开时的回调，我的设想现在只是用来播放开启音效 | —        |

## 入场动画

一个类似SAO动画里的入场动画，纯CSS写的3D动画算是比较创意的地方？

标签：`<link-start></link-start>`

### 用法举例

```
<template>
  <div>
    <button @click="go">LinkStart</button>
    <link-start @beforeStart="LinkStart" @Start="Start" @End="End" :visible.sync = "SLVisible"></link-start>

    <audio ref="LinkStart">
      <source src="https://www.yamapink.com/sao-ui/sounds/LinkStart.SAO.Kirito.mp3" type="audio/mp3">
    </audio>
    <audio ref="NerveGear">
      <source src="https://www.yamapink.com/sao-ui/sounds/Startup.SAO.NerveGear.mp3" type="audio/mp3">
    </audio>
    <audio ref="Welcome">
      <source src="https://www.yamapink.com/sao-ui/sounds/Popup.ALO.Welcome.mp3" type="audio/mp3">
    </audio>

  </div>
</template>
<script>
export default {
  data(){
    return{
      SLVisible:false,
    }
  },
  methods:{
    go(){
      this.SLVisible = true;
    },
    LinkStart(){
      this.$refs.LinkStart.play();
    },
    Start(){
      this.$refs.NerveGear.play();
    },
    End(){
      this.$refs.Welcome.play();
    }
  },
}
</script>
```

### Attributes

| 参数    | 说明                               | 类型    | 可选值 | 默认值 |
| ------- | ---------------------------------- | ------- | ------ | :----- |
| visible | 是否显示 弹出框，支持 .sync 修饰符 | Boolean | —      | false  |

### Events

| 事件名称    | 说明                                           | 回调函数 |
| ----------- | ---------------------------------------------- | -------- |
| beforeStart | 动画开始前的回调，我的设想现在只是用来播放音效 | —        |
| Start       | 动画开始后的回调，我的设想现在只是用来播放音效 | —        |
| End         | 动画结束的回调，我的设想现在只是用来播放音效   | —        |

## v-drag

添加了拖拽的directive，想用的话就直接在标签里使用吧

### 使用方法

```
//main.js
import {Drag} from 'sao-ui-test'

Vue.directive('drag',Drag)
```

