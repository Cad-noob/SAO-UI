## 这是一个SAO-UI TEST版本

基于`Vue2`的UI组件库，模仿了Sao Utils，之后有时间的话我会发布更好更完善的SAO-UI

设计的不是很完美，需要你有一定的Vue基础

暂时先写了几个小组件，正式版本还有待慢慢完善，总之先写起来

感谢akilar提供的帮助，开发过类似UI的朋友

github: https://github.com/Cad-noob/SAO-UI

## 更新内容

1.解决了一些逻辑上没考虑到位的BUG

2.之前的文档有描述不清的地方，进行了改动



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

## 音频TIPS

所有音频都是不能打开网页就立即播放，这个大家都懂为什么。所以使用起来得符合规范，例如进场的LINK START就可以采取点击一些”小玩意”来触发。

## alert框

模仿了Sao Utils的对话框，做了很多个人喜欢的动画效果

标签：`<sao-alert></sao-alert>`

效果图：

![image-20220620194256282](https://s2.loli.net/2022/06/20/g1ICxQuk3Uia4GS.png)

### 用法举例

```
<template>
  <div>
  	<button @click="open">Alert</button>
    <sao-alert :icon="true" :title="title" :visible.sync="AlertVisible">
      {{msg}}
    </sao-alert>
  </div>
</template>
<script>

export default {
  data(){
    return{
      title:"Welcome",
      AlertVisible:false,
      msg:"Hello!Welcome to the Sao world"
    }
  },
  methods:{
    open(){
      this.AlertVisible = true;
    }
  }
}
</script>
<style scoped>
</style>
```

### Attributes

| 参数    | 说明                                        | 类型    | 可选值     | 默认值  |
| ------- | ------------------------------------------- | ------- | ---------- | :------ |
| visible | 是否显示 弹出框，支持 .sync 修饰符          | Boolean | true,false | false   |
| title   | 弹出框的标题                                | String  | —          | Message |
| icon    | 是否显示底部开关,不显示点击对话框就可以关闭 | Boolean | —          | false   |

### Slot

| name | 说明                                             |
| ---- | ------------------------------------------------ |
| —    | 直接在标签之间输入即可，会插入到弹出框中间的内容 |

### Events

| 事件名称 | 说明                                 | 回调函数 |
| -------- | ------------------------------------ | -------- |
| ok       | 当显示底部开关后，点击蓝色按钮的回调 | —        |

## 入场动画

一个类似SAO动画里的入场动画，纯CSS写的3D动画算是比较创意的地方？

标签：`<link-start></link-start>`

效果图：

![image-20220620194053981](https://s2.loli.net/2022/06/20/IAuYCxbrncS2Qis.png)

![image-20220620194042113](https://s2.loli.net/2022/06/20/noMmUYiB6KudG7t.png)

![image-20220620194117870](https://s2.loli.net/2022/06/20/X7R4MwsyWtH83qi.png)

### 用法举例

```
<template>
  <div>
    <button @click="open">Link Start</button>
    <link-start :visible.sync="LSVisible"></link-start>
  </div>
</template>
<script>

export default {
  name:"test",
  data(){
    return{
      LSVisible:false,
    }
  },
  methods:{
    open(){
      this.LSVisible = true;
    }
  }
}
</script>
<style scoped>
</style>
```

### Attributes

| 参数    | 说明                               | 类型    | 可选值     | 默认值 |
| ------- | ---------------------------------- | ------- | ---------- | :----- |
| visible | 是否显示 弹出框，支持 .sync 修饰符 | Boolean | true,false | false  |

## Live2d

一个还在不断完善的组件，其实不用开放属性有接触过的应该都懂那些参数配置是啥，总之先这样了。基于GITHUB上各位大佬们的代码，我只是做了个简单的封装和修改。

因为waifu-tips.js采用了大量的jquery，我不太想改成原生了（懒），文档中会附带vue2中所需要做的jquery该如何配置，有兴趣的朋友可以帮我改改哈哈。

模型现在是挂在我服务器上的，所以如果流量不够了以后可能会转其他地方，或者大家自己下载配置？

PS：我关闭了原作者很多的功能，我不希望搞的那么复杂，当然不是说不好，如果你们喜欢直接不要用我的这套就好

标签:`<live2d></live2d>`

效果图：

![image-20220620193950712](https://s2.loli.net/2022/06/20/WPBI24Flknyequ8.png)

### 用法举例

```
<template>
  <div>
    <live2d :textures-id="textId" :hitokoto="false" :json="json" :edge-side="75"></live2d>
  </div>
</template>
<script>
import 'jquery-ui-dist/jquery-ui';

export default {
  data(){
    return{
      textId:1,
      json:'https://www.yamapink.com/sao-ui/waifu-tips.json',
    }
  },
}
</script>
<style scoped>
</style>
```

### Attributes

| 参数     | 说明                                                         | 类型    | 可选值     | 默认值                                          |
| -------- | ------------------------------------------------------------ | ------- | ---------- | :---------------------------------------------- |
| Textures | 模型皮肤ID，总共有几十个吧，暂时更新了10个，会陆续更新的（修改配置好累啊，自己没事可以随便填填ID也许我就更新了） | Number  | 1~40       | 1                                               |
| Hitokoto | 随机出现一些名人名言，true打开功能，false关闭                | Boolean | true,false | false                                           |
| Json     | 对话内容文件地址                                             | String  | —          | https://www.yamapink.com/sao-ui/waifu-tips.json |
| EdgeSide | live2d模型所在初始横坐标百分比                               | Number  | 0~100      | 80                                              |

注意：

> 1.json文件无论你放在哪，本地也好 anywhere u like ，但是文件名一定得是 waifu-tips.json，不理解的话可以阅读waifu-tips.js
>
> 2.json文件的内容参考这个文件就行，很容易看懂的
>
> 3.记得import jquery-ui
>
> 4.点击模型控制台会有报错，这是live2d.js的问题，暂时不会有任何影响

### jquery配置

注意：

> 因为我在配置里依赖了jquery和jjquery-ui，所以兄弟们如果自己也使用了这俩（虽然我不喜欢用），记得看看这俩会不会导致BUG

这里列下我的版本，虽然我感觉应该问题不是很大

```
 "dependencies": {
    "jquery": "^3.6.0",
    "jquery-ui-dist": "^1.13.1"
  }
```

需要在`vue.config.js`中对jquery进行配置

```
const webpack = require('webpack')

module.exports = {
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }]);
    }
}
```

## HP

用来现实SAO款式的HP小组件，具体功能怎么去体现，需要大家集思广益，共同猜想

标签：`<hp></hp>`

效果图：

![image-20220620193704391](https://s2.loli.net/2022/06/20/WyxA3EUpBXa2zTI.png)

### 用法举例

```
<template>
  <div>
    <hp :position="['5%','100px']" :username="'Yamapink'" :current="700" :total="1000" :level="10"></hp>
  </div>
</template>
<script>

export default {

}
</script>
<style scoped>
</style>
```

### Attributes

| 参数     | 说明                                                         | 类型   | 可选值 | 默认值      |
| -------- | ------------------------------------------------------------ | ------ | ------ | ----------- |
| position | 组件初始位置，数组中依次保存横坐标，纵坐标，单位可以是"px"也可是"%" | Array  | —      | ["6%","8%"] |
| username | 用户名                                                       | String | —      | player      |
| current  | 当前血量m，不要输入负数哦，任一正数                          | Number | —      | 100         |
| total    | 总血量，如上一样                                             | Number | —      | 100         |
| level    | 用户等级                                                     | Number | —      | 0           |

## 个人信息框 info

模仿SAO UTILS的弹出框，`alt+i`既可弹出信息框

标签:`<info></info>`



## v-drag

添加了拖拽的directive，想用的话就直接在标签里使用吧，使用时`v-drag = "true"`

### 使用方法

```
//main.js
import {Drag} from 'sao-ui-test'

Vue.directive('drag',Drag)
```

