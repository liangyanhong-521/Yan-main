<template>
  <div class="y-popover">
    <!-- 弹出框有两个内容，一个是弹出框，一个是按钮 -->

    <div
      ref="popover"
      class="y-popover-wrapper"
      v-if="nestable === false && seeable"
    >
      <span class="title">{{ title }}</span>
      <span class="content">{{ content }}</span>
    </div>

    <div ref="popover" class="y-popover-wrapper" v-if="nestable && visible">
      <slot></slot>
    </div>

    <!-- 按钮的插入点 -->
    <div ref="button">
      <slot name="button"></slot>
    </div>
  </div>
</template>


<script>
import YButton from "./button.vue";
export default {
  name: "YPopover",
  components: {
    YButton,
  },
  data() {
    return {
      seeable: false,
    };
  },
  props: {
    //触发方式
    trigger: {
      type: String,
      default: "click",
      validator: function (value) {
        return ["hover", "click", "focus"].includes(value);
      },
    },
    //触发的位置
    position: {
      type: String,
      default: "top",
      validator: function (value) {
        return ["top", "bottom", "left", "right"].includes(value);
      },
    },
    title: {
      type: String,
      default: "标题",
    },
    content: {
      type: String,
      default: "这是一段弹窗内容这是一段弹窗内容这是一段弹窗内容",
    },
    //是否显示嵌套
    nestable: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.trigger === "hover") {
      this.$refs.button.onmouseenter = this.onshow;
      this.$refs.button.onmouseleave = this.onclose;
    }
    if (this.trigger === "click") {
      this.$refs.button.onclick = this.onshow;
    }
    if (this.trigger === "focus") {
      this.$refs.button.onmousedown = this.onshow;
      this.$refs.button.onmouseup = this.onclose;
    }
  },
  beforeDestroy() {
    if (this.trigger === "hover") {
      this.$refs.button.onmouseenter = this.onshow;
      this.$refs.button.onmouseleave = this.onclose;
    }
    if (this.trigger === "click") {
      this.$refs.button.onclick = this.onshow;
    }
    if (this.trigger === "focus") {
      this.$refs.button.onmousedown = this.onshow;
      this.$refs.button.onmouseup = this.onclose;
    }
  },
  methods: {
    onshow() {
      this.seeable = true;
      this.$nextTick(() => {
        this.positionHandle();
      });
    },
    onclose() {
      this.seeable = false;
    },
    positionHandle() {
      const { button, popover } = this.$refs;
      if (button && popover) {
        let { width, height, top, left} = popover.getBoundingClientRect();
        // width, height,是弹出框的高和宽
        // top, left 是按钮相对于浏览器视口的位置。

        let { width:width2 , height: height2 } = button.getBoundingClientRect();
         // height2 是按钮的高，

        //positions的top和left的视图是弹出框相对与按钮来设置的。

        let positions = {
          top: {
            top:  -height + window.pageYOffset,
            left: -(height+height2)/2 + window.pageXOffset,
          },
          bottom: {
            top: height2 + window.pageYOffset,
            left: -(height+height2)/2 + window.pageXOffset,
          },
          left: {
            top:   -(height-height2)/2 + window.pageYOffset,
            left:  -width + window.pageXOffset,
          },
          right: {
            top: -(height-height2)/2 + window.pageYOffset,
            left:  width2 + window.pageXOffset,
          },
        };

        //下面的语句中popover的视图是相对与button组件的视图，即
        popover.style.left = positions[this.position].left + "px";
        popover.style.top = positions[this.position].top + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.y-popover {
  display: inline-block;
  position: relative;
}

.y-popover-wrapper {
  width: 230px;
  height: 90px;
  border: 1px solid transparent;
  box-shadow: 1px 1px 5px #888888;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  position:absolute;
  padding-left: 10px;
  .title {
    margin-top: 7px;
    margin-right: 10px;
  }
  .content {
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>