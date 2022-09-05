<template>
  <div id="app">
    <y-button>文字按钮</y-button>
    <y-button>文字按钮</y-button>
    <y-button type="info" @click="handle">文字按钮</y-button>
    <y-button type="text" disabled>文字按钮</y-button>


    <y-popover class = "popover01" trigger="hover" position="right">
      <y-button slot="button">hover激活</y-button>
    </y-popover>

    <y-popover class = "popover02" trigger="focus" position="right">
      <y-button slot="button">focus激活</y-button>
    </y-popover>

    <y-popover class = "popover03" trigger="click" position="right">
      <y-button slot="button">click激活</y-button>
    </y-popover>


    <y-popover class = "popover04" nestable  :visible="visible" position="bottom">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="display:flex;margin-left:90px;margin-top:-10px">
        <y-button size="small" type="text" @click="visible = false">取消</y-button>
        <y-button type="primary" size="small" @click="visible = false">确定</y-button>
      </div>
      <y-button slot="button" @click="handle">嵌套激活</y-button>
    </y-popover>
  </div>
</template>

<script>
import YButton from "./components/button.vue";
import YPopover from "./components/Popover.vue";

export default {
  name: "App",
  components: {
    YButton,
    YPopover,
  },
  data(){
    return{
      visible: false,
    }
  },
  methods: {
    handle() {
      this.visible = true
    },
  },
};
</script>

<style lang="scss" scoped>
#app{
  align-items: center;
}
.popover01{
  position: relative;
  left: 350px;
  top: 60px;
}
.popover02{
  position: relative;
  left: 350px;
  top: 160px;

}
.popover03{
  position: relative;
  left: 350px;
  top: 260px;

}
.popover04{
  position: relative;
  left: 350px;
  top: 360px;
}
</style>>