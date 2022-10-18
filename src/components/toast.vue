<template>
  <div class="wrapper-toast">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
       <slot v-if="!enableHtml"></slot>
       <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="button" v-if="!autoClose">
      <div class="button-cancel" @click="cancel" v-if="closeButton.text">{{closeButton.text}}</div>
      <div class="button-confirm" @click="confirm" v-if="confirmButton.text">{{confirmButton.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YToast",
  props: {
    // 是否自动关闭
    autoClose: {
      type: Boolean,
      default: true,
    },
    // 自动关闭的时间
    autoCloseDelay: {
      type: Number,
      default: 3,
    },
    // 是否支持HTML形式
    enableHtml: {
      type: Boolean,
      default: false,
    },
    // 自定义取消按钮
    closeButton: {
      type: Object,
      default: () => {
        return {
          text: '',
          callback: undefined,
        };
      },
    },
    // 自定义确定按钮
    confirmButton: {
      type: Object,
      default: () => {
        return {
          text: '',
          callback: undefined,
        };
      },
    },
  },
  mounted() {
    this.execAutoClose();
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    close() {
      this.$el.remove();
      this.$emit("close");
      this.$destroy();
    },
    cancel() {
      this.close();
      this.closeButton.callback()
    },
    confirm() {
      this.close();
      this.confirmButton.callback()
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-toast {
  width: 350px;
  height: 140px;
  font-size: 13px;
  background-color: rgb(250, 249, 249);
  border: 1px solid rgb(228, 225, 225);
  position: fixed;
  top:40%;
  left: 40%;
  border-radius: 4px;
  box-shadow: 0 0  3px rgb(155, 153, 153);;
}
.title{
  position: absolute;
  top: 10%;
  left: 5%;
  font-size: 16px;

}
.content{
  position: absolute;
  top: 40%;
  left: 15%;
}
.button {
  display: flex;
  cursor: pointer;
  &-cancel {
    position: absolute;
    width: 55px;
    text-align: center;
    padding: 4px;
    background-color: rgb(88, 204, 233);
    border-radius: 2px;
    bottom: 5%;
    left: 55%;
  }
  &-confirm {
    width: 55px;
    padding: 4px;
    text-align: center;
    background-color: rgb(88, 204, 233);
    position: absolute;
    border-radius: 2px;
    bottom: 5%;
    left: 75%;
  }
}
</style>