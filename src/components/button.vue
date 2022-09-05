<template>
  <div>
    <button class="y-button" :class="classes" @click="handle">
      <y-icon v-if="icon" :icon="icon"></y-icon>
      <y-icon v-if="loading" icon="y-icon-jiazaizhong"></y-icon>
      <!-- 加载中按钮设置 -->
      <div :class="{ content: icon || loading }">
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
import YIcon from "./icon.vue";
export default {
  name: "YButton",
  components: {
    YIcon,
  },
  // 传过来的数据应该有type size
  props: {
    size: {
      type: String,
      default: "middle",
      validator: function (value) {
        return ["small", "middle", "large"].indexOf(value) >= 0;
      },
    },
    type: {
      //如果子组件中有传过来的type，则负组件中this.type为子组件中的字符串
      type: String,
      default: "default",
      validator: function (value) {
        return [
          "primary",
          "info",
          "error",
          "warning",
          "success",
          "text",
          "default"
        ].indexOf(value) >= 0;
      },
    },
    // 图标按钮
    icon: {
      type: String,
      validator: function (value) {
        return [
          "y-icon-jiazaizhong",
          "y-icon-yunshangchuan_o",
          "y-icon-bianji1",
          "y-icon-tianjia1",
          "y-icon-shanchu",
          "y-icon-sousuo_o",
        ].includes(value);
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    //是否圆角按钮
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [`y-button-${this.type}`]: true,
        [`y-button-${this.size}`]: true,
        [`disabled`]: this.disabled,
        [`round`]: this.round,
        [`loading`]: this.loading,
      };
    },
  },
  methods: {
    // 如果按钮为禁用状态那么点击按钮之后的所有事件都不管用。
    handle() {
      if (this.disabled) {
        return;
      } else {
        this.$emit("click")
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
.y-button {
  width: 70px;
  height: 35px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid rgb(214, 212, 212);
  background-color: white;
  border-radius: 4px;
  color: rgb(94, 92, 92);

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .icon {
    margin-left: -2px;
    margin-top: 3px;
  }
  .content {
    display: inline;
    position: relative;
    bottom: 4px;
  }

  // &:hover{
  //   background-color: rgb(206, 232, 240);
  //   border: 1px solid rgb(146, 213, 233);
  //   color: rgb(11, 182, 235);
  // }

  &-small {
    width: 63px;
    height: 30px;
    font-size: 11px;
    &.round {
      border-radius: 14px;
    }
    .icon {
      margin-right: 4px;
    }
    .content {
      display: inline;
      position: relative;
      bottom: 4px;
    }
  }
  &-middle {
    width: 77px;
    height: 38px;
    &.round {
      border-radius: 17px;
    }
    .icon {
      margin-right: 4px;
    }
    .content {
      display: inline;
      position: relative;
      bottom: 5px;
    }
  }
  &-large {
    width: 90px;
    height: 42px;
    &.round {
      border-radius: 19px;
    }
    .icon {
      margin-right: 4px;
    }
    .content {
      display: inline;
      position: relative;
      bottom: 5px;
    }
  }
  &-default {
    &:not(.disabled) {
      &:hover {
        background-color: rgb(206, 232, 240);
        border: 1px solid rgb(146, 213, 233);
        color: rgb(11, 182, 235);
      }
    }
  }
  &-text {
    border: none;
    color: rgb(70, 114, 236);
    &.disabled {
      cursor: not-allowed;
      color: rgb(104, 106, 109);
    }
    &:not(.disabled) {
      &:hover {
        color: #57a3f3;
      }
    }
  }
  &-primary {
    color: white;
    background-color: rgb(43, 138, 247);
    &:not(.disabled) {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &-info {
    color: white;
    background-color: rgb(143, 138, 138);
    &:not(.disabled) {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &-error {
    color: white;
    background-color: red;
    &:not(.disabled) {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &-warning {
    color: white;
    background-color: orange;
    &:not(.disabled) {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &-success {
    color: white;
    background-color: rgb(12, 170, 104);
    &:not(.disabled) {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  &.loading .icon {
    animation: spin 2s infinite linear;
  }
}

// .y-button-loading-true{
</style>
